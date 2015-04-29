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

    function disablePrimaryTool () {
        primaryToolButton.uncheck()
        primaryTool.disable()
    }

    function enableEraser () {
        eraserButton.check()
        eraserTool.enable()
    }

    function enablePrimaryTool () {
        primaryToolButton.check()
        primaryTool.enable()
    }

    function eraserListener () {
        toolPanel.hide()
        closeAllPanels()
        disablePrimaryTool()
        enableEraser()
        paramsPanel.setSize(eraserSize)
        eraserButton.mark()
        primaryToolButton.unmark()
        updateButtonColor(eraserButton, [eraserTool])
        primaryToolOrEraserListener = eraserListener
    }

    function primaryToolListener () {
        closeAllPanels()
        disableEraser()
        enablePrimaryTool()
        paramsPanel.setSize(pencilSize)
        primaryToolButton.mark()
        eraserButton.unmark()
        updateButtonColor(primaryToolButton, [pencilTool, lineTool, bucketTool])
        primaryToolOrEraserListener = primaryToolListener
    }

    function setCurrentToolColor (hue, saturation, luminance, alpha, button) {
        if (button == primaryToolButton.colorButton) {
            setPrimaryToolColor(hue, saturation, luminance, alpha)
        }
        if (button == eraserButton.colorButton) {
            setEraserColor(hue, saturation, luminance, alpha)
        }
        paramsPanel.setColor(hue, saturation, luminance)
    }

    function setEraserColor (hue, saturation, luminance, alpha) {
        eraserTool.setColor(hue, saturation, luminance, alpha)
        eraserButton.setColor(hue, saturation, luminance, alpha)
    }

    function setPrimaryToolColor (hue, saturation, luminance, alpha) {
        primaryTool.setColor(hue, saturation, luminance, alpha)
        primaryToolButton.setColor(hue, saturation, luminance, alpha)
    }

    function updateButtonColor (button, tools) {
        var colorButton = button.colorButton
        palettePanel.select(colorButton)
        var color = colorButton.color,
            hue = color.hue,
            saturation = color.saturation,
            luminance = color.luminance
        tools.forEach(function (tool) {
            tool.setColor(hue, saturation, luminance, color.alpha)
        })
        paramsPanel.setColor(hue, saturation, luminance)
    }

    var pencilSize = 4,
        eraserSize = 8

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var primaryToolOrEraserListener = primaryToolListener

    var toolPanel = ToolPanel(function () {
        primaryToolButton.setIcon('pencil')
        primaryTool.disable()
        primaryTool = pencilTool
        primaryTool.enable()
        paramsButton.enable()
    }, function () {
        primaryToolButton.setIcon('line')
        primaryTool.disable()
        primaryTool = lineTool
        primaryTool.enable()
        paramsButton.enable()
    }, function () {
        primaryToolButton.setIcon('bucket')
        primaryTool.disable()
        primaryTool = bucketTool
        primaryTool.enable()
        paramsButton.disable()
    })

    var palettePanel = PalettePanel(setCurrentToolColor, function () {
        closePalette()
        closeFile()
        primaryToolOrEraserListener()
    }, function (button) {
        if (primaryToolOrEraserListener == primaryToolListener) {

            var oldButton = primaryToolButton.colorButton
            if (oldButton != eraserButton.colorButton) oldButton.unmark()

            primaryToolButton.colorButton = button
            button.mark()

        } else {

            var oldButton = eraserButton.colorButton
            if (oldButton != primaryToolButton.colorButton) oldButton.unmark()

            eraserButton.colorButton = button
            button.mark()

        }
    }, function (activeButton) {

        var color = activeButton.color
        pickPanel.setColor(color.hue, color.saturation, color.luminance, 1)

        pickTool.enable()
        palettePanel.hide()
        mainBar.slide()

    })

    var pencilTool = PencilTool(pencilSize, canvas)

    var lineTool = LineTool(pencilSize, canvas)

    var bucketTool = BucketTool(canvas)

    var eraserTool = PencilTool(eraserSize, canvas)

    var primaryTool = pencilTool

    var pickTool = PickTool(canvas, function (hue, saturation, luminance) {
        pickPanel.setColor(hue, saturation, luminance, 1)
    })

    var paramsPanel = ParamsPanel(function (size) {
        if (primaryToolOrEraserListener == primaryToolListener) {
            pencilSize = size
            pencilTool.setSize(size)
            lineTool.setSize(size)
        } else {
            eraserSize = size
            eraserTool.setSize(size)
        }
    }, function () {
        primaryToolOrEraserListener()
    })
    paramsPanel.setSize(pencilSize)

    var filePanel = FilePanel(function () {
        canvas.operate(function (c) {
            var size = c.canvas.width
            c.fillStyle = '#fff'
            c.globalAlpha = 1
            c.fillRect(0, 0, size, size)
        })
        primaryToolOrEraserListener()
    }, function (image) {
        canvas.operate(function (c) {
            var canvasElement = canvas.element
            OpenImage(c, image, canvasElement.offsetWidth, canvasElement.offsetHeight)
        })
        primaryToolOrEraserListener()
    }, function () {
        var canvasElement = canvas.element,
            width = canvasElement.offsetWidth,
            height = canvasElement.offsetHeight
        SaveCanvas(canvas.canvas, width, height)
        primaryToolOrEraserListener()
    })

    var primaryToolButton = ToolButton('pencil', function () {
        if (primaryToolButton.isChecked()) {
            if (toolPanel.isVisible()) toolPanel.hide()
            else toolPanel.show()
        }
        primaryToolListener()
    })
    primaryToolButton.addClass(classPrefix + '-primaryToolButton')
    primaryToolButton.colorButton = palettePanel.blackButton

    var eraserButton = ToolButton('eraser', eraserListener)
    eraserButton.addClass(classPrefix + '-eraserButton')
    eraserButton.colorButton = palettePanel.whiteButton

    setEraserColor(0, 0, 100, 1)
    setPrimaryToolColor(0, 0, 0, 1)

    var paletteButton = BarButton('palette', function () {
        if (paletteButton.isChecked()) {
            primaryToolOrEraserListener()
        } else {

            disablePrimaryTool()
            disableEraser()
            toolPanel.hide()
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
            primaryToolOrEraserListener()
        } else {

            disablePrimaryTool()
            disableEraser()
            toolPanel.hide()
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
            primaryToolOrEraserListener()
        } else {

            disablePrimaryTool()
            disableEraser()
            toolPanel.hide()
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
    contentElement.appendChild(toolPanel.element)
    contentElement.appendChild(palettePanel.element)
    contentElement.appendChild(paramsPanel.element)
    contentElement.appendChild(filePanel.element)

    var pickPanel = PickPanel(function (hue, saturation, luminance) {
        palettePanel.pickColor(hue, saturation, luminance)
        setCurrentToolColor(hue, saturation, luminance, 1, palettePanel.getActiveButton())
    }, function () {
        pickTool.disable()
        unslideMainBar()
        if (palettePanel.isEditVisible()) palettePanel.show()
        else primaryToolOrEraserListener()
    })

    var mainBar = MainBar(pickPanel)
    mainBar.addButton(primaryToolButton)
    mainBar.addButton(eraserButton)
    mainBar.addButton(paletteButton)
    mainBar.addButton(paramsButton)
    mainBar.addButton(undoButton)
    mainBar.addButton(fileButton)

    var unslideMainBar = mainBar.unslide

    var element = Div(classPrefix)
    element.appendChild(contentElement)
    element.appendChild(mainBar.element)

    return {
        element: element,
        resize: function () {
            var canvasElement = canvas.element
            bucketTool.resize(canvasElement.offsetWidth, canvasElement.offsetHeight)
        },
        show: function () {
            primaryToolListener()
            mainBar.show()
        },
    }

}
