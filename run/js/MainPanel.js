function MainPanel () {

    function closeAllPanels () {
        closePalette()
        closeParams()
        closeFile()
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

    function disablePencil () {
        pencilButton.uncheck()
        pencilTool.disable()
    }

    function disableEraser () {
        eraserButton.uncheck()
        eraserTool.disable()
    }

    function enableEraser () {
        eraserButton.check()
        eraserTool.enable()
    }

    function enablePencil () {
        pencilButton.check()
        pencilTool.enable()
    }

    function eraserListener () {
        closeAllPanels()
        disablePencil()
        enableEraser()
        paramsPanel.setSize(eraserSize)
        eraserButton.mark()
        pencilButton.unmark()
        updateToolColor(eraserTool)
        pencilOrEraserListener = eraserListener
    }

    function pencilListener () {
        closeAllPanels()
        disableEraser()
        enablePencil()
        paramsPanel.setSize(pencilSize)
        pencilButton.mark()
        eraserButton.unmark()
        updateToolColor(pencilTool)
        pencilOrEraserListener = pencilListener
    }

    function updateToolColor (tool) {
        var colorButton = tool.colorButton
        palettePanel.selectButton(colorButton)
        var color = colorButton.color
        tool.setColor(color.hue, color.saturation, color.luminance, color.alpha)
    }

    var pencilSize = 4,
        eraserSize = 8

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var pencilOrEraserListener = pencilListener

    var palettePanel = PalettePanel(function (hue, saturation, luminance, alpha) {
        if (pencilOrEraserListener == pencilListener) {
            pencilTool.setColor(hue, saturation, luminance, alpha)
        } else {
            eraserTool.setColor(hue, saturation, luminance, alpha)
        }
        paramsPanel.setColor(hue, saturation, luminance)
    }, function () {
        closePalette()
        closeFile()
        pencilOrEraserListener()
    }, function (button) {
        if (pencilOrEraserListener == pencilListener) {

            var oldButton = pencilTool.colorButton
            if (oldButton != eraserTool.colorButton) oldButton.unmark()

            pencilTool.colorButton = button
            button.mark()

        } else {

            var oldButton = eraserTool.colorButton
            if (oldButton != pencilTool.colorButton) oldButton.unmark()

            eraserTool.colorButton = button
            button.mark()

        }
    })

    var pencilTool = PencilTool(pencilSize, canvas)
    pencilTool.colorButton = palettePanel.blackButton
    pencilTool.setColor(0, 0, 0, 1)
    pencilTool.enable()

    var eraserTool = PencilTool(eraserSize, canvas)
    eraserTool.colorButton = palettePanel.whiteButton
    eraserTool.setColor(0, 0, 100, 1)

    var paramsPanel = ParamsPanel(function (size) {
        if (pencilOrEraserListener == pencilListener) {
            pencilSize = size
            pencilTool.setSize(size)
        } else {
            eraserSize = size
            eraserTool.setSize(size)
        }
    }, function () {
        pencilOrEraserListener()
    })
    paramsPanel.setSize(pencilSize)

    var filePanel = FilePanel(function () {
        canvas.operate(function (c) {
            var size = c.canvas.width
            c.fillStyle = '#fff'
            c.globalAlpha = 1
            c.fillRect(0, 0, size, size)
        })
        pencilOrEraserListener()
    }, function (image) {
        canvas.operate(function (c) {
            var size = c.canvas.width
            var x = (size - image.width) / 2
            var y = (size - image.height) / 2
            c.globalAlpha = 1
            c.drawImage(image, x, y)
        })
        pencilOrEraserListener()
    }, function () {
        var width = canvas.element.offsetWidth
        var height = canvas.element.offsetHeight
        SaveCanvas(canvas.canvas, width, height)
        pencilOrEraserListener()
    })

    var pencilButton = BarButton('pencil', pencilListener)
    pencilButton.addClass(classPrefix + '-pencilButton')
    pencilButton.check()

    var eraserButton = BarButton('eraser', eraserListener)
    eraserButton.addClass(classPrefix + '-eraserButton')

    var paletteButton = BarButton('palette', function () {
        if (paletteButton.isChecked()) {
            pencilOrEraserListener()
        } else {
            closeParams()
            closeFile()
            disablePencil()
            disableEraser()
            palettePanel.show()
            paletteButton.check()
        }
    })
    paletteButton.addClass(classPrefix + '-paletteButton')

    var paramsButton = BarButton('params', function () {
        if (paramsButton.isChecked()) {
            pencilOrEraserListener()
        } else {
            closePalette()
            closeFile()
            disablePencil()
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
            pencilOrEraserListener()
        } else {
            closePalette()
            closeParams()
            disablePencil()
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
    barElement.appendChild(pencilButton.element)
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
