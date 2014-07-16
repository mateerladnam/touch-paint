function MainPanel () {

    function brushListener () {
        closePalette()
        closeParams()
        closeFile()
        disableEraser()
        enableBrush()
        brushOrEraserListener = brushListener
    }

    function closePalette () {
        palettePanel.hide()
        paletteButton.uncheck()
    }

    function closeParams () {
        paramsPanel.hide()
        paramsButton.uncheck()
    }

    function closeFile () {
        filePanel.hide()
        fileButton.uncheck()
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

    function eraserListener () {
        closePalette()
        closeParams()
        closeFile()
        disableBrush()
        enableEraser()
        brushOrEraserListener = eraserListener
    }

    var brushSize = 4

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var brushOrEraserListener = brushListener

    var brushTool = BrushTool(brushSize, canvas)
    brushTool.enable()

    var eraserTool = EraserTool(brushSize, canvas)

    var palettePanel = PalettePanel(function (hue, saturation, luminance, alpha) {
        brushTool.setColor(hue, saturation, luminance, alpha)
        paramsPanel.setColor(hue, saturation, luminance)
    }, function () {
        closePalette()
        closeFile()
        enableBrush()
    })

    var paramsPanel = ParamsPanel(brushSize, function (brushSize) {
        brushTool.setSize(brushSize)
        eraserTool.setSize(brushSize)
    }, function () {
        brushOrEraserListener()
    })

    var filePanel = FilePanel(function () {
        canvas.operate(function (c) {
            var size = c.canvas.width
            c.fillStyle = '#fff'
            c.fillRect(0, 0, size, size)
        })
        brushOrEraserListener()
    }, function (image) {
        canvas.operate(function (c) {
            var size = c.canvas.width
            var x = (size - image.width) / 2
            var y = (size - image.height) / 2
            c.drawImage(image, x, y)
        })
        brushOrEraserListener()
    }, function () {
        var width = canvas.element.offsetWidth
        var height = canvas.element.offsetHeight
        SaveCanvas(canvas.canvas, width, height)
        brushOrEraserListener()
    })

    var brushButton = BarButton('pencil', brushListener)
    brushButton.addClass(classPrefix + '-brushButton')
    brushButton.check()

    var eraserButton = BarButton('eraser', eraserListener)
    eraserButton.addClass(classPrefix + '-eraserButton')

    var paletteButton = BarButton('palette', function () {
        if (paletteButton.isChecked()) {
            brushOrEraserListener()
        } else {
            closeParams()
            closeFile()
            disableBrush()
            disableEraser()
            palettePanel.show()
            paletteButton.check()
        }
    })
    paletteButton.addClass(classPrefix + '-paletteButton')

    var paramsButton = BarButton('params', function () {
        if (paramsButton.isChecked()) {
            brushOrEraserListener()
        } else {
            closePalette()
            closeFile()
            disableBrush()
            disableEraser()
            paramsPanel.show()
            paramsButton.check()
        }
    })
    paramsButton.addClass(classPrefix + '-paramsButton')

    var undoButton = UndoButton(canvas.undo)

    canvas.onUndoAvailable(undoButton.enable)
    canvas.onUndoUnavailable(undoButton.disable)

    var fileButton = BarButton('burger', function () {
        if (fileButton.isChecked()) {
            brushOrEraserListener()
        } else {
            closePalette()
            closeParams()
            disableBrush()
            disableEraser()
            filePanel.show()
            fileButton.check()
        }
    })
    fileButton.addClass(classPrefix + '-fileButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(canvas.element)
    contentElement.appendChild(palettePanel.element)
    contentElement.appendChild(paramsPanel.element)
    contentElement.appendChild(filePanel.element)

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)
    barElement.appendChild(paletteButton.element)
    barElement.appendChild(paramsButton.element)
    barElement.appendChild(undoButton.element)
    barElement.appendChild(fileButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)
    element.appendChild(barElement)

    return { element: element }

}
