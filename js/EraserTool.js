function EraserTool (canvas) {

    var activeTouches = {}

    var brushSize = 10
    var halfBrushSize = brushSize / 2
    var enabled = false

    var c = canvas.getContext('2d')

    canvas.addEventListener('touchstart', function (e) {
        if (!enabled) return
        var rect = canvas.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            var x = touch.clientX - rect.left,
                y = touch.clientY - rect.top
            c.save()
            c.translate(x, y)
            c.beginPath()
            c.arc(0, 0, halfBrushSize, 0, Math.PI * 2)
            c.fill()
            c.restore()
            activeTouches[touch.identifier] = { x: x, y: y }
        })
    })
    canvas.addEventListener('touchmove', function (e) {
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
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            delete activeTouches[touch.identifier]
        })
    })

    return {
        disable: function () {
            enabled = false
        },
        enable: function () {
            enabled = true
            c.lineWidth = brushSize
            c.lineCap = 'round'
            c.strokeStyle = c.fillStyle = '#fff';
        },
    }

}
