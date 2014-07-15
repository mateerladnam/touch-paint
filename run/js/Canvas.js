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
    c.lineCap = 'round'

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var undoCanvas = document.createElement('canvas')
    undoCanvas.width = undoCanvas.height = size

    var undoC = undoCanvas.getContext('2d')
    undoC.fillStyle = '#fff'
    undoC.fillRect(0, 0, size, size)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    clear()

    var operations = []

    return {
        canvas: canvas,
        clear: clear,
        element: element,
        operate: function (operation) {
            operations.push(operation)
            operation(c)
            if (operations.length > 1024) operations.shift()(undoC)
        },
        undo: function () {
            c.drawImage(undoCanvas, 0, 0)
            if (operations.length) {
                operations.pop()
                operations.forEach(function (operation) {
                    operation(c)
                })
            }
        },
    }

}
