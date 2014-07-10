function MainPanel () {

    function brushListener () {
        closePalette()
        closeParams()
        disableEraser()
        enableBrush()
        brushOrEraserListener = brushListener
    }

    function eraserListener () {
        closePalette()
        closeParams()
        disableBrush()
        enableEraser()
        brushOrEraserListener = eraserListener
    }

    function closePalette () {
        palettePanel.hide()
        paletteButton.uncheck()
    }

    function closeParams () {
        paramsPanel.hide()
        paramsButton.uncheck()
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

    var brushOrEraserListener = brushListener

    var brushTool = BrushTool(canvas.canvas)
    brushTool.enable()

    var eraserTool = EraserTool(canvas.canvas)

    var palettePanel = PalettePanel(function (color) {
        brushTool.setColor(color)
        closePalette()
        enableBrush()
    })

    var paramsPanel = ParamsPanel(function (brushSize) {
        brushTool.setSize(brushSize)
        eraserTool.setSize(brushSize)
    }, function () {
        closeParams()
        brushOrEraserListener()
    })

    var brushButton = BarButton('pencil', brushListener)
    brushButton.addClass(classPrefix + '-brushButton')
    brushButton.check()

    var eraserButton = BarButton('eraser', eraserListener)
    eraserButton.addClass(classPrefix + '-eraserButton')

    var paletteButton = BarButton('palette', function () {
        if (paletteButton.isChecked()) {
            closePalette()
            brushOrEraserListener()
        } else {
            closeParams()
            disableBrush()
            disableEraser()
            palettePanel.show()
            paletteButton.check()
        }
    })
    paletteButton.addClass(classPrefix + '-paletteButton')

    var paramsButton = BarButton('params', function () {
        if (paramsButton.isChecked()) {
            closeParams()
            brushOrEraserListener()
        } else {
            closePalette()
            disableBrush()
            disableEraser()
            paramsPanel.show()
            paramsButton.check()
        }
    })
    paramsButton.addClass(classPrefix + '-paramsButton')

    var saveButton = BarButton('floppy', function () {
        SaveCanvas(canvas.canvas, canvas.element.offsetWidth, canvas.element.offsetHeight)
    })
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(canvas.element)
    contentElement.appendChild(palettePanel.element)
    contentElement.appendChild(paramsPanel.element)

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)
    barElement.appendChild(paletteButton.element)
    barElement.appendChild(paramsButton.element)
    barElement.appendChild(saveButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)
    element.appendChild(barElement)

    return { element: element }

}
