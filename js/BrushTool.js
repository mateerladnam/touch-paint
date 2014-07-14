function BrushTool (size, canvas) {

    function enable () {
        enabled = true
        c.lineWidth = size
        c.strokeStyle = c.fillStyle = hsl
    }

    var activeTouches = {}

    var halfSize = size / 2

    var enabled = false

    var canvasElement = canvas.canvas

    var c = canvasElement.getContext('2d')

    canvasElement.addEventListener('touchstart', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {

            var x = touch.clientX - rect.left,
                y = touch.clientY - rect.top

            ;(function (halfSize) {
                canvas.operate(function (c) {
                    c.save()
                    c.translate(x, y)
                    c.beginPath()
                    c.arc(0, 0, halfSize, 0, Math.PI * 2)
                    c.fill()
                    c.restore()
                })
            })(halfSize)

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

                ;(function (oldX, oldY) {
                    canvas.operate(function (c) {
                        c.beginPath()
                        c.moveTo(oldX, oldY)
                        c.lineTo(x, y)
                        c.stroke()
                    })
                })(activeTouch.x, activeTouch.y)

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
        enable: enable,
        disable: function () {
            enabled = false
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
            if (enabled) enable()
        },
    }

}
