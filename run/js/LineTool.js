function LineTool (size, canvas) {

    function beginLine (e) {

        var startPoint = {}
        setCoords(startPoint, e)

        var endPoint = {
            x: startPoint.x,
            y: startPoint.y
        }

        var that = {
            color: hsl,
            endPoint: endPoint,
            size: size,
            startPoint: startPoint,
            end: function () {
                lines.splice(lines.indexOf(that), 1)
                update()
                canvas.operate(function (c) {
                    drawLine(c, that)
                }, 200)
            },
            move: function (e) {
                setCoords(endPoint, e)
                update()
            },
        }

        lines.push(that)
        update()

        return that

    }

    function drawLine (c, line) {

        var startPoint = line.startPoint,
            endPoint = line.endPoint

        c.beginPath()
        c.moveTo(startPoint.x, startPoint.y)
        c.lineTo(endPoint.x, endPoint.y)
        c.strokeStyle = line.color
        c.lineCap = 'round'
        c.lineWidth = line.size
        c.stroke()

    }

    function mouseDown (e) {

        function mouseMove (e) {
            line.move(e)
            update()
        }

        function mouseUp () {
            line.end()
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
        }

        if (e.button !== 0) return

        e.preventDefault()
        if (touched) touched = false
        else {
            var line = beginLine(e)
            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)
        }

    }

    function setCoords (coords, e) {
        var rect = canvasElement.getBoundingClientRect()
        coords.x = e.clientX - rect.left
        coords.y = e.clientY - rect.top
    }

    function touchEnd (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            var identifier = touch.identifier
            var activeTouch = activeTouches[identifier]
            if (!activeTouch) continue
            activeTouch.end()
            delete activeTouches[identifier]
        }
    }

    function touchMove (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            var activeTouch = activeTouches[touch.identifier]
            if (!activeTouch) continue
            activeTouch.move(touch)
        }
    }

    function touchStart (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            activeTouches[touch.identifier] = beginLine(touch)
        }
    }

    function update () {
        overlayC.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        lines.forEach(function (line) {
            drawLine(overlayC, line)
        })
    }

    var lines = []

    var touched = false
    var activeTouches = {}
    var enabled = false
    var canvasElement = canvas.canvas
    var hue = 0, saturation = 0, luminance = 0, alpha = 1
    var hsl = 'hsla(0, 0%, 0%, 1)'

    var overlayCanvas = document.createElement('canvas')
    overlayCanvas.className = 'LineTool-overlayCanvas'
    overlayCanvas.width = canvasElement.width
    overlayCanvas.height = canvasElement.height
    overlayCanvas.style.top = canvasElement.style.top
    overlayCanvas.style.left = canvasElement.style.left

    var overlayC = overlayCanvas.getContext('2d')

    canvasElement.parentNode.appendChild(overlayCanvas)

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            canvasElement.removeEventListener('touchstart', touchStart)
            canvasElement.removeEventListener('touchmove', touchMove)
            canvasElement.removeEventListener('touchend', touchEnd)
            canvasElement.removeEventListener('touchcancel', touchEnd)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            canvasElement.addEventListener('touchstart', touchStart)
            canvasElement.addEventListener('touchmove', touchMove)
            canvasElement.addEventListener('touchend', touchEnd)
            canvasElement.addEventListener('touchcancel', touchEnd)
            enabled = true
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {
            hue = _hue
            saturation = _saturation
            luminance = _luminance
            alpha = _alpha
            hsl = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, ' + alpha + ')'
        },
        setSize: function (_size) {
            size = _size
        },
    }

}
