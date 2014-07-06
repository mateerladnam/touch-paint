function MainPanel () {

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var brushTool = BrushTool(canvas.canvas)
    brushTool.enable()

    var eraserTool = EraserTool(canvas.canvas)

    var brushButton = BarButton('pencil', function () {
        eraserButton.uncheck()
        brushButton.check()
        eraserTool.disable()
        brushTool.enable()
    })
    brushButton.check()

    var eraserButton = BarButton('eraser', function () {
        brushButton.uncheck()
        eraserButton.check()
        brushTool.disabled()
        eraserTool.enable()
    })

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)

    var element = Div(classPrefix)
    element.appendChild(canvas.element)
    element.appendChild(barElement)

    return { element: element }

}
