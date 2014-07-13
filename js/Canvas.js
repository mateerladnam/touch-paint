function Canvas () {

    function clear () {
        c.save()
        c.fillStyle = '#fff'
        c.fillRect(0, 0, size, size)
        c.restore()
    }

    var classPrefix = 'Canvas'

    var size = Math.max(screen.width, screen.height)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvas.height = size
    canvas.style.left = canvas.style.top = -size / 2 + 'px'

    var c = canvas.getContext('2d')

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    clear()

    return {
        canvas: canvas,
        clear: clear,
        element: element,
        open: function (image) {
            var x = (size - image.width) / 2
            var y = (size - image.height) / 2
            c.drawImage(image, x, y)
        },
    }

}
