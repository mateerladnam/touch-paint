function BrushTool (size, canvas) {

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

                ;(function (size, hsl, oldX, oldY) {
                    canvas.operate(function (c) {
                        c.lineWidth = size
                        c.strokeStyle = c.fillStyle = hsl
                        c.beginPath()
                        c.moveTo(oldX, oldY)
                        c.lineTo(x, y)
                        c.stroke()
                    })
                })(size, hsl, activeTouch.x, activeTouch.y)

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

            ;(function (size, hsl, halfSize) {
                canvas.operate(function (c) {
                    c.lineWidth = size
                    c.strokeStyle = c.fillStyle = hsl
                    c.beginPath()
                    c.arc(x, y, halfSize, 0, Math.PI * 2)
                    c.fill()
                })
            })(size, hsl, halfSize)

            activeTouches[touch.identifier] = { x: x, y: y }

        }
    }

    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas

    var hue = 0, saturation = 0, luminance = 0, alpha = 1
    var hsl = 'hsla(0, 0%, 0%, 1)'

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
