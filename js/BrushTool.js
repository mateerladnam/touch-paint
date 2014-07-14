function BrushTool (size, canvas) {

    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas

    canvasElement.addEventListener('touchstart', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {

            var x = touch.clientX - rect.left,
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

        })
    })
    canvasElement.addEventListener('touchmove', function (e) {
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
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
        })
    })
    canvasElement.addEventListener('touchend', function (e) {
        e.preventDefault()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            delete activeTouches[touch.identifier]
        })
    })

    var hue = 0, saturation = 0, luminance = 0
    var hsl = 'hsl(0, 0%, 0%)'

    return {
        disable: function () {
            enabled = false
        },
        enable: function () {
            enabled = true
        },
        setColor: function (_hue, _saturation, _luminance) {
            hue = _hue
            saturation = _saturation
            luminance = _luminance
            hsl = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)'
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
        },
    }

}
