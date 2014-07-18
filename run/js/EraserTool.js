function EraserTool (size, canvas) {

    function touchEnd (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            delete activeTouches[touches[i].identifier]
        }
    }

    function touchMove (e) {
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            var activeTouch = activeTouches[touch.identifier]
            if (activeTouch) {

                var x = touch.clientX - rect.left,
                    y = touch.clientY - rect.top

                ;(function (size, oldX, oldY, x, y) {
                    canvas.operate(function (c) {
                        c.lineWidth = size
                        c.strokeStyle = color
                        c.beginPath()
                        c.moveTo(oldX, oldY)
                        c.lineTo(x, y)
                        c.stroke()
                    })
                })(size, activeTouch.x, activeTouch.y, x, y)

                activeTouch.x = x
                activeTouch.y = y
            }
        }
    }

    function touchStart (e) {
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {

            var touch = touches[i],
                x = touch.clientX - rect.left,
                y = touch.clientY - rect.top

            ;(function (size, halfSize) {
                canvas.operate(function (c) {
                    c.lineWidth = size
                    c.fillStyle = color
                    c.beginPath()
                    c.arc(x, y, halfSize, 0, Math.PI * 2)
                    c.fill()
                })
            })(size, halfSize)

            activeTouches[touch.identifier] = { x: x, y: y }

        }
    }

    var color = '#fff'
    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas

    return {
        disable: function () {
            if (enabled) {
                canvasElement.removeEventListener('touchstart', touchStart)
                canvasElement.removeEventListener('touchmove', touchMove)
                canvasElement.removeEventListener('touchend', touchEnd)
                enabled = false
            }
        },
        enable: function () {
            if (!enabled) {
                enabled = true
                canvasElement.addEventListener('touchstart', touchStart)
                canvasElement.addEventListener('touchmove', touchMove)
                canvasElement.addEventListener('touchend', touchEnd)
            }
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
            if (enabled) enable()
        },
    }

}
