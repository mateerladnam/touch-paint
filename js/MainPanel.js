function MainPanel () {

    var classPrefix = 'MainPanel'

    var brushButton = BarButton('pencil')

    var eraserButton = BarButton('eraser')

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)

    var canvas = Canvas()

    var element = Div(classPrefix)
    element.appendChild(canvas.element)
    element.appendChild(barElement)

    return { element: element }

}
