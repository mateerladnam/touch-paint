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

                ;(function (size, halfSize, hsl, oldX, oldY, x, y) {
                    canvas.operate(function (c) {

                        var dx = x - oldX
                        var dy = y - oldY
                        var steps = Math.max(Math.abs(Math.ceil(dx)), Math.abs(Math.ceil(dy)))
                        var stepX = dx / steps
                        var stepY = dy / steps

                        c.fillStyle = hsl

                        c.save()
                        c.translate(oldX, oldY)
                        c.globalAlpha = 1 / Math.sqrt(size)
                        for (var i = 0; i < steps; i++) {
                            c.translate(stepX, stepY)
                            c.beginPath()
                            c.arc(0, 0, halfSize, 0, Math.PI * 2)
                            c.fill()
                        }
                        c.restore()

                    })
                })(size, halfSize, hsl, activeTouch.x, activeTouch.y, x, y)

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

            ;(function (size, halfSize, hsl) {
                canvas.operate(function (c) {
                    c.lineWidth = size
                    c.globalAlpha = 1 / Math.sqrt(size)
                    c.fillStyle = hsl
                    c.beginPath()
                    c.arc(x, y, halfSize, 0, Math.PI * 2)
                    c.fill()
                })
            })(size, halfSize, hsl)

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
