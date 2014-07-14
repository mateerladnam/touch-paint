function BrushTool (size, canvas) {

    function enable () {
        enabled = true
        c.lineWidth = size
        c.lineCap = 'round'
        c.strokeStyle = c.fillStyle = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)'
    }

    var activeTouches = {}

    var halfSize = size / 2

    var enabled = false

    var c = canvas.getContext('2d')

    canvas.addEventListener('touchstart', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvas.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            var x = touch.clientX - rect.left,
                y = touch.clientY - rect.top
            c.save()
            c.translate(x, y)
            c.beginPath()
            c.arc(0, 0, halfSize, 0, Math.PI * 2)
            c.fill()
            c.restore()
            activeTouches[touch.identifier] = { x: x, y: y }
        })
    })
    canvas.addEventListener('touchmove', function (e) {
        e.preventDefault()
        var rect = canvas.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            var activeTouch = activeTouches[touch.identifier]
            if (activeTouch) {
                var x = touch.clientX - rect.left,
                    y = touch.clientY - rect.top
                c.beginPath()
                c.moveTo(activeTouch.x, activeTouch.y)
                c.lineTo(x, y)
                c.stroke()
                activeTouch.x = x
                activeTouch.y = y
            }
        })
    })
    canvas.addEventListener('touchend', function (e) {
        e.preventDefault()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            delete activeTouches[touch.identifier]
        })
    })

    var hue = 0, saturation = 0, luminance = 0

    return {
        enable: enable,
        disable: function () {
            enabled = false
        },
        setColor: function (_hue, _saturation, _luminance) {
            hue = _hue
            saturation = _saturation
            luminance = _luminance
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
            if (enabled) enable()
        },
    }

}
