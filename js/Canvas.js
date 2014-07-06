function Canvas () {

    var activeTouches = {}

    var classPrefix = 'Canvas'

    var brushSize = 4

    var size = Math.max(screen.width, screen.height)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvas.height = size
    canvas.style.left = canvas.style.top = -size / 2 + 'px'
    canvas.addEventListener('touchstart', function (e) {
        var rect = canvas.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            var x = touch.clientX - rect.left,
                y = touch.clientY - rect.top
            c.save()
            c.translate(x, y)
            c.beginPath()
            c.arc(0, 0, brushSize / 2, 0, Math.PI * 2)
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
        var rect = canvas.getBoundingClientRect()
        Array.prototype.forEach.call(e.changedTouches, function (touch) {
            var activeTouch = activeTouches[touch.identifier]
            if (activeTouch) {
                var x = touch.clientX - rect.left,
                    y = touch.clientY - rect.top
                c.save()
                c.translate(x, y)
                c.beginPath()
                c.arc(0, 0, 4, 0, Math.PI * 2)
                c.fill()
                c.restore()
                delete activeTouches[touch.identifier]
            }
        })
    })

    var c = canvas.getContext('2d')
    c.lineWidth = brushSize * 2
    c.lineCap = 'round'

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    return {
        element: element,
    }

}
