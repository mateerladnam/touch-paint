function EraserTool (size, canvas) {

    function enable () {
        enabled = true
        c.lineWidth = size
        c.lineCap = 'round'
        c.strokeStyle = c.fillStyle = '#fff';
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
                canvas.operate(function () {
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
                    c.beginPath()
                    c.moveTo(oldX, oldY)
                    c.lineTo(x, y)
                    c.stroke()
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

    return {
        enable: enable,
        disable: function () {
            enabled = false
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
            if (enabled) enable()
        },
    }

}
