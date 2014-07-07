function MainPanel () {

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var brushTool = BrushTool(canvas.canvas)
    brushTool.enable()

    var eraserTool = EraserTool(canvas.canvas)

    var palettePanel = PalettePanel()

    var brushButton = BarButton('pencil', function () {
        eraserButton.uncheck()
        brushButton.check()
        eraserTool.disable()
        brushTool.enable()
    })
    brushButton.addClass(classPrefix + '-brushButton')
    brushButton.check()

    var eraserButton = BarButton('eraser', function () {
        brushButton.uncheck()
        eraserButton.check()
        brushTool.disabled()
        eraserTool.enable()
    })
    eraserButton.addClass(classPrefix + '-eraserButton')

    var paletteButton = BarButton('palette', function () {
    })
    paletteButton.addClass(classPrefix + '-paletteButton')

    var saveButton = BarButton('floppy', function () {
        SaveCanvas(canvas.canvas, canvas.element.offsetWidth, canvas.element.offsetHeight)
    })
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(canvas.element)

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)
    barElement.appendChild(paletteButton.element)
    barElement.appendChild(saveButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)
    element.appendChild(barElement)

    return { element: element }

}
