function MainPanel () {

    function closeAllPanels () {
        closePalette()
        closeParams()
        closeFile()
        unslideMainBar()
    }

    function closeFile () {
        filePanel.hide()
        fileButton.uncheck()
    }

    function closePalette () {
        palettePanel.hide()
        paletteButton.uncheck()
    }

    function closeParams () {
        paramsPanel.hide()
        paramsButton.uncheck()
    }

    function disableEraser () {
        eraserButton.uncheck()
        eraserTool.disable()
    }

    function disablePencil () {
        pencilButton.uncheck()
        pencilTool.disable()
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

    function setEraserColor (hue, saturation, luminance, alpha) {
        eraserTool.setColor(hue, saturation, luminance, alpha)
        eraserButton.setColor(hue, saturation, luminance, alpha)
    }

    function setPencilColor (hue, saturation, luminance, alpha) {
        pencilTool.setColor(hue, saturation, luminance, alpha)
        pencilButton.setColor(hue, saturation, luminance, alpha)
    }

    function updateToolColor (tool) {
        var colorButton = tool.colorButton
        palettePanel.select(colorButton)
        var color = colorButton.color,
            hue = color.hue,
            saturation = color.saturation,
            luminance = color.luminance
        tool.setColor(hue, saturation, luminance, color.alpha)
        paramsPanel.setColor(hue, saturation, luminance)
    }

    var pencilSize = 4,
        eraserSize = 8

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var pencilOrEraserListener = pencilListener

    var palettePanel = PalettePanel(function (hue, saturation, luminance, alpha, button) {
        if (button == pencilTool.colorButton) {
            setPencilColor(hue, saturation, luminance, alpha)
        }
        if (button == eraserTool.colorButton) {
            setEraserColor(hue, saturation, luminance, alpha)
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
    }, function () {
        palettePanel.hide()
        mainBar.slide()
    })

    var pencilTool = PencilTool(pencilSize, canvas)
    pencilTool.colorButton = palettePanel.blackButton
    pencilTool.enable()

    var eraserTool = PencilTool(eraserSize, canvas)
    eraserTool.colorButton = palettePanel.whiteButton

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
            var canvasElement = canvas.element
            OpenImage(c, image, canvasElement.offsetWidth, canvasElement.offsetHeight)
        })
        pencilOrEraserListener()
    }, function () {
        var width = canvas.element.offsetWidth
        var height = canvas.element.offsetHeight
        SaveCanvas(canvas.canvas, width, height)
        pencilOrEraserListener()
    })

    var pencilButton = ToolButton('pencil', pencilListener)
    pencilButton.addClass(classPrefix + '-pencilButton')
    pencilButton.check()

    var eraserButton = ToolButton('eraser', eraserListener)
    eraserButton.addClass(classPrefix + '-eraserButton')

    setEraserColor(0, 0, 100, 1)
    setPencilColor(0, 0, 0, 1)

    var paletteButton = BarButton('palette', function () {
        if (paletteButton.isChecked()) {
            pencilOrEraserListener()
        } else {

            disablePencil()
            disableEraser()
            closeParams()
            closeFile()
            unslideMainBar()

            palettePanel.show()
            paletteButton.check()

        }
    })
    paletteButton.addClass(classPrefix + '-paletteButton')

    var paramsButton = BarButton('params', function () {
        if (paramsButton.isChecked()) {
            pencilOrEraserListener()
        } else {

            disablePencil()
            disableEraser()
            closePalette()
            closeFile()
            unslideMainBar()

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

            disablePencil()
            disableEraser()
            closePalette()
            closeParams()
            unslideMainBar()

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

    var pickPanel = PickPanel(function () {
        console.log('pick')
    }, function () {
        unslideMainBar()
        palettePanel.show()
    })

    var mainBar = MainBar(pickPanel)
    mainBar.addButton(pencilButton)
    mainBar.addButton(pencilButton)
    mainBar.addButton(eraserButton)
    mainBar.addButton(paletteButton)
    mainBar.addButton(paramsButton)
    mainBar.addButton(undoButton)
    mainBar.addButton(fileButton)

    var unslideMainBar = mainBar.unslide

    var element = Div(classPrefix)
    element.appendChild(contentElement)
    element.appendChild(mainBar.element)

    return { element: element }

}
