function EraserTool (size, canvas) {

    var color = '#fff'
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

            ;(function (size, halfSize) {
                canvas.operate(function (c) {
                    c.lineWidth = size
                    c.strokeStyle = c.fillStyle = color
                    c.beginPath()
                    c.arc(x, y, halfSize, 0, Math.PI * 2)
                    c.fill()
                })
            })(size, halfSize)

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

                ;(function (size, oldX, oldY) {
                    canvas.operate(function (c) {
                        c.lineWidth = size
                        c.strokeStyle = c.fillStyle = color
                        c.beginPath()
                        c.moveTo(oldX, oldY)
                        c.lineTo(x, y)
                        c.stroke()
                    })
                })(size, activeTouch.x, activeTouch.y)

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
        disable: function () {
            enabled = false
        },
        enable: function () {
            enabled = true
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
            if (enabled) enable()
        },
    }

}
