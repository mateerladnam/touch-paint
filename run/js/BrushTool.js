function BrushTool (size, canvas) {

    function beginBrush (x, y) {
        ;(function (size, halfSize, hsl) {
            canvas.operate(function (c) {
                c.lineWidth = size
                c.fillStyle = hsl
                c.beginPath()
                c.arc(x, y, halfSize, 0, Math.PI * 2)
                c.fill()
            })
        })(size, halfSize, hsl)
    }

    function mouseDown (e) {
        e.preventDefault()
        if (touched) touched = false
        else {
            isMouseDown = true
            var rect = canvasElement.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
            beginBrush(mouseX, mouseY)
        }
    }

    function mouseUp () {
        if (touched) touched = false
        else isMouseDown = false
    }

    function mouseMove (e) {
        if (touched) touched = false
        else if (isMouseDown) {
            var rect = canvasElement.getBoundingClientRect()
            var x = e.clientX - rect.left,
                y = e.clientY - rect.top
            moveBrush(mouseX, mouseY, x, y)
            mouseX = x
            mouseY = y
        }
    }

    function moveBrush (oldX, oldY, x, y) {
        ;(function (size, hsl) {
            canvas.operate(function (c) {
                c.lineWidth = size
                c.strokeStyle = hsl
                c.beginPath()
                c.moveTo(oldX, oldY)
                c.lineTo(x, y)
                c.stroke()
            })
        })(size, hsl)
    }

    function touchEnd (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            delete activeTouches[touches[i].identifier]
        }
    }

    function touchMove (e) {
        touched = true
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            var activeTouch = activeTouches[touch.identifier]
            if (activeTouch) {
                var x = touch.clientX - rect.left,
                    y = touch.clientY - rect.top
                moveBrush(activeTouch.x, activeTouch.y, x, y)
                activeTouch.x = x
                activeTouch.y = y
            }
        }
    }

    function touchStart (e) {
        touched = true
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i],
                x = touch.clientX - rect.left,
                y = touch.clientY - rect.top
            beginBrush(x, y)
            activeTouches[touch.identifier] = { x: x, y: y }
        }
    }

    var mouseX, mouseY, isMouseDown = false
    var touched = false
    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas
    var hue = 0, saturation = 0, luminance = 0, alpha = 1
    var hsl = 'hsla(0, 0%, 0%, 1)'

    return {
        disable: function () {
            if (enabled) {
                canvasElement.removeEventListener('mousedown', mouseDown)
                canvasElement.removeEventListener('mousemove', mouseMove)
                canvasElement.removeEventListener('mouseup', mouseUp)
                canvasElement.removeEventListener('touchstart', touchStart)
                canvasElement.removeEventListener('touchmove', touchMove)
                canvasElement.removeEventListener('touchend', touchEnd)
                enabled = false
            }
        },
        enable: function () {
            if (!enabled) {
                canvasElement.addEventListener('mousedown', mouseDown)
                canvasElement.addEventListener('mousemove', mouseMove)
                canvasElement.addEventListener('mouseup', mouseUp)
                canvasElement.addEventListener('touchstart', touchStart)
                canvasElement.addEventListener('touchmove', touchMove)
                canvasElement.addEventListener('touchend', touchEnd)
                enabled = true
            }
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
            halfSize = size / 2
        },
    }

}
