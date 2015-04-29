function LineTool (size, canvas) {

    function Line (e) {

        var start = {}
        setCoords(start, e)

        var end = {
            x: start.x,
            y: start.y
        }

        return {
            color: hsl,
            end: end,
            size: size,
            start: start,
            move: function (e) {
                setCoords(end, e)
            },
        }

    }

    function drawLine (c, line) {

        var start = line.start,
            end = line.end

        c.beginPath()
        c.moveTo(start.x, start.y)
        c.lineTo(end.x, end.y)
        c.strokeStyle = line.color
        c.lineWidth = line.size
        c.stroke()

    }

    function mouseDown (e) {

        function mouseMove (e) {
            line.move(e)
            update()
        }

        function mouseUp () {
            lines.splice(lines.indexOf(line), 1)
            canvas.operate(function (c) {
                drawLine(c, line)
            })
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
            update()
        }

        addEventListener('mousemove', mouseMove)
        addEventListener('mouseup', mouseUp)

        var line = Line(e)
        lines.push(line)
        update()

    }

    function setCoords (coords, e) {
        var rect = canvasElement.getBoundingClientRect()
        coords.x = e.clientX - rect.left
        coords.y = e.clientY - rect.top
    }

    function update () {
        overlayC.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height)
        lines.forEach(function (line) {
            drawLine(overlayC, line)
        })
    }

    var lines = []

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
    overlayC.lineCap = 'round'

    canvasElement.parentNode.appendChild(overlayCanvas)

    return {
        disable: function () {
            canvasElement.removeEventListener('mousedown', mouseDown)
        },
        enable: function () {
            canvasElement.addEventListener('mousedown', mouseDown)
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
