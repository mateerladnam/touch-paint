function EraserTool (size, canvas) {

    function beginEraser (x, y) {
        ;(function (size, halfSize) {
            canvas.operate(function (c) {
                c.lineWidth = size
                c.fillStyle = color
                c.beginPath()
                c.arc(x, y, halfSize, 0, Math.PI * 2)
                c.fill()
            })
        })(size, halfSize)
    }

    function mouseDown (e) {
        if (touched) touched = false
        else {
            isMouseDown = true
            var rect = canvasElement.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
            beginEraser(mouseX, mouseY)
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
            moveEraser(mouseX, mouseY, x, y)
            mouseX = x
            mouseY = y
        }
    }

    function moveEraser (oldX, oldY, x, y) {
        ;(function (size) {
            canvas.operate(function (c) {
                c.lineWidth = size
                c.strokeStyle = color
                c.beginPath()
                c.moveTo(oldX, oldY)
                c.lineTo(x, y)
                c.stroke()
            })
        })(size)
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
                moveEraser(activeTouch.x, activeTouch.y, x, y)
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
            beginEraser(x, y)
            activeTouches[touch.identifier] = { x: x, y: y }
        }
    }

    var mouseX, mouseY, isMouseDown = false
    var touched = false
    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas
    var color = '#fff'

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
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
        },
    }

}
