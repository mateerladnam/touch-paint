function MainPanel () {

    function closePalette () {
        palettePanel.hide()
        paletteButton.uncheck()
    }

    function disableBrush () {
        brushButton.uncheck()
        brushTool.disable()
    }

    function disableEraser () {
        eraserButton.uncheck()
        eraserTool.disable()
    }

    function enableBrush () {
        brushButton.check()
        brushTool.enable()
    }

    function enableEraser () {
        eraserButton.check()
        eraserTool.enable()
    }

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var brushTool = BrushTool(canvas.canvas)
    brushTool.enable()

    var eraserTool = EraserTool(canvas.canvas)

    var palettePanel = PalettePanel()

    var brushButton = BarButton('pencil', function () {
        closePalette()
        disableEraser()
        enableBrush()
    })
    brushButton.addClass(classPrefix + '-brushButton')
    brushButton.check()

    var eraserButton = BarButton('eraser', function () {
        closePalette()
        disableBrush()
        enableEraser()
    })
    eraserButton.addClass(classPrefix + '-eraserButton')

    var paletteButton = BarButton('palette', function () {
        if (paletteButton.isChecked()) {
            closePalette()
        } else {
            disableBrush()
            disableEraser()
            palettePanel.show()
            paletteButton.check()
        }
    })
    paletteButton.addClass(classPrefix + '-paletteButton')

    var saveButton = BarButton('floppy', function () {
        SaveCanvas(canvas.canvas, canvas.element.offsetWidth, canvas.element.offsetHeight)
    })
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(canvas.element)
    contentElement.appendChild(palettePanel.element)

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
