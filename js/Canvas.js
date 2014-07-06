function Canvas () {

    var classPrefix = 'Canvas'

    var size = Math.max(screen.width, screen.height)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvas.height = size
    canvas.style.left = canvas.style.top = -size / 2 + 'px'

    var c = canvas.getContext('2d')
    c.fillStyle = '#fff'
    c.fillRect(0, 0, size, size)

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    return {
        canvas: canvas,
        element: element,
    }

}
