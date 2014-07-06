function MainPanel () {

    var classPrefix = 'MainPanel'

    var brushButton = BarButton('pencil', function () {
        eraserButton.uncheck()
        brushButton.check()
    })
    brushButton.check()

    var eraserButton = BarButton('eraser', function () {
        brushButton.uncheck()
        eraserButton.check()
    })

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)

    var canvas = Canvas()

    var element = Div(classPrefix)
    element.appendChild(canvas.element)
    element.appendChild(barElement)

    return { element: element }

}
