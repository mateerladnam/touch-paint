(function () {
function AlphaSlider (changeListener, endListener) {

    function update () {
        var hsl = hue + ', ' + saturation + '%, ' + luminance + '%'
        var color = 'hsl(' + hsl + ')'
        var transparent = 'hsla(' + hsl + ', 0)'
        var grid = 'url(images/color-background.svg)'
        var shadowStops = 'rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)'
        portraitBarElement.style.backgroundImage =
            'linear-gradient(' + shadowStops + '), ' +
            'linear-gradient(90deg, ' + transparent + ', ' + color + '), ' + grid
        landscapeBarElement.style.backgroundImage =
            'linear-gradient(90deg, ' + shadowStops + '), ' +
            'linear-gradient(' + color + ', ' + transparent + '), ' + grid
    }

    var classPrefix = 'AlphaSlider'

    var portraitBarElement = Div(classPrefix + '-portraitBar')

    var landscapeBarElement = Div(classPrefix + '-landscapeBar')

    var hue = 0, saturation = 0, luminance = 0

    var slider = Slider(function (ratio) {
        changeListener(ratio)
        update()
    }, endListener)
    slider.setRatio(1)
    slider.addClass(classPrefix)
    slider.barElement.appendChild(portraitBarElement)
    slider.barElement.appendChild(landscapeBarElement)

    update()

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setAlpha: slider.setRatio,
        setHue: function (_hue) {
            hue = _hue
            update()
        },
        setLuminance: function (_luminance) {
            luminance = _luminance
            update()
        },
        setSaturation: function (_saturation) {
            saturation = _saturation
            update()
        },
    }

}
;
function BarButton (icon, clickListener) {

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    var touched = false

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        e.preventDefault()
        click()
    })

    var activeTimeout
    var checked = false
    var classList = element.classList

    return {
        contentElement: contentElement,
        element: element,
        addClass: function (className) {
            classList.add(className)
        },
        check: function () {
            classList.add('checked')
            checked = true
        },
        isChecked: function () {
            return checked
        },
        uncheck: function () {
            classList.remove('checked')
            checked = false
        },
    }

}
;
function Canvas () {

    var classPrefix = 'Canvas'

    var size = Math.max(screen.width, screen.height)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvas.height = size
    canvas.style.left = canvas.style.top = -size / 2 + 'px'

    var c = canvas.getContext('2d')
    c.lineCap = 'round'
    c.fillStyle = '#fff'
    c.fillRect(0, 0, size, size)

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    var operations = []

    var undoAvailableListener
    var undoUnavailableListener

    var undoSize = 128
    var undoCanvases = []

    return {
        canvas: canvas,
        element: element,
        onUndoAvailable: function (listener) {
            undoAvailableListener = listener
        },
        onUndoUnavailable: function (listener) {
            undoUnavailableListener = listener
        },
        operate: function (operation) {

            operations.push(operation)
            if (operations.length == 1) undoAvailableListener()
            operation(c)

            var operationIndex = operations.length - undoSize
            if (operationIndex < 0) return

            var canvasIndex = Math.floor(operationIndex / undoSize)

            if (undoCanvases[canvasIndex]) return

            var undoCanvas = document.createElement('canvas')
            undoCanvas.width = undoCanvas.height = size

            var undoC = undoCanvas.getContext('2d')
            undoC.lineCap = 'round'

            if (canvasIndex) {
                undoC.drawImage(undoCanvases[canvasIndex - 1], 0, 0)
            } else {
                undoC.fillStyle = '#fff'
                undoC.fillRect(0, 0, size, size)
            }

            undoCanvases.push(undoCanvas)

            for (var i = operationIndex; i < operationIndex + undoSize; i++) {
                operations[i](undoC)
            }

        },
        undo: function () {

            c.globalAlpha = 1
            if (undoCanvases.length) {
                c.drawImage(undoCanvases[undoCanvases.length - 1], 0, 0)
            } else {
                c.fillStyle = '#fff'
                c.fillRect(0, 0, size, size)
            }

            if (operations.length) {

                operations.pop()
                var startIndex = undoCanvases.length * undoSize
                for (var i = startIndex; i < operations.length; i++) {
                    operations[i](c)
                }

                if (undoCanvases.length * undoSize > operations.length) {
                    undoCanvases.pop()
                }

                if (!operations.length) undoUnavailableListener()

            }

        },
    }

}
;
function ColorButton (clickListener) {

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    var touched = false

    var classPrefix = 'ColorButton'

    var opaqueElement = Div(classPrefix + '-opaque')

    var colorElement = Div(classPrefix + '-color')
    colorElement.appendChild(opaqueElement)

    var contentElement = Div(classPrefix + '-transparency Button-content')
    contentElement.appendChild(colorElement)
    contentElement.style.backgroundImage = 'url(images/color-background.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        e.preventDefault()
        click()
    })

    var activeTimeout
    var checked = false
    var classList = element.classList

    var color = {}

    return {
        color: color,
        element: element,
        addClass: function (className) {
            classList.add(className)
        },
        check: function () {
            classList.add('checked')
            checked = true
        },
        isChecked: function () {
            return checked
        },
        mark: function () {
            classList.add('marked')
        },
        setColor: function (hue, saturation, luminance, alpha) {

            color.hue = hue
            color.saturation = saturation
            color.luminance = luminance
            color.alpha = alpha

            var hslPart = hue + ', ' + saturation + '%, ' + luminance + '%'

            var hsla = 'hsla(' + hslPart + ', ' + alpha + ')'
            colorElement.style.backgroundColor = hsla

            var hsl = 'hsl(' + hslPart + ')'
            opaqueElement.style.backgroundColor = hsl

        },
        uncheck: function () {
            classList.remove('checked')
            checked = false
        },
        unmark: function () {
            classList.remove('marked')
        },
    }

}
;
function ColorButtonsPanel (selectListener) {

    function createButton (hue, saturation, luminance, colorName) {
        var button = ColorButton(function () {
            select(button)
            selectListener(button)
        })
        button.setColor(hue, saturation, luminance, 1)
        button.addClass(classPrefix + '-colorButton')
        button.addClass(classPrefix + '-' + colorName + 'Button')
        buttons.push(button)
        return button
    }

    function select (button) {
        activeButton.uncheck()
        button.check()
        activeButton = button
        that.setColor = button.setColor
    }

    var buttons = []

    var classPrefix = 'ColorButtonsPanel'

    var blackButton = createButton(0, 0, 0, 'black')
    blackButton.check()
    blackButton.mark()

    var darkGreyButton = createButton(0, 0, 40, 'darkGrey')

    var lightGreyButton = createButton(0, 0, 70, 'lightGrey')

    var whiteButton = createButton(0, 0, 100, 'white')
    whiteButton.mark()

    var blueButton = createButton(232, 100, 50, 'blue')

    var skyBlueButton = createButton(210, 100, 80, 'skyBlue')

    var darkGreenButton = createButton(114, 100, 33, 'darkGreen')

    var greenButton = createButton(115, 87, 50, 'green')

    var redButton = createButton(4, 100, 47, 'red')

    var yellowButton = createButton(60, 100, 50, 'yellow')

    var brownButton = createButton(30, 100, 33, 'brown')

    var orangeButton = createButton(32, 100, 50, 'orange')

    var violetButton = createButton(306, 100, 33, 'violet')

    var pinkButton = createButton(312, 100, 83, 'pink')

    var darkSkinButton = createButton(30, 55, 65, 'darkSkin')

    var lightSkinButton = createButton(31, 55, 75, 'lightSkin')

    var activeButton = blackButton

    var element = Div(classPrefix)
    element.appendChild(blackButton.element)
    element.appendChild(darkGreyButton.element)
    element.appendChild(lightGreyButton.element)
    element.appendChild(whiteButton.element)
    element.appendChild(blueButton.element)
    element.appendChild(skyBlueButton.element)
    element.appendChild(darkGreenButton.element)
    element.appendChild(greenButton.element)
    element.appendChild(redButton.element)
    element.appendChild(yellowButton.element)
    element.appendChild(brownButton.element)
    element.appendChild(orangeButton.element)
    element.appendChild(violetButton.element)
    element.appendChild(pinkButton.element)
    element.appendChild(darkSkinButton.element)
    element.appendChild(lightSkinButton.element)

    var that = {
        blackButton: blackButton,
        element: element,
        select: select,
        whiteButton: whiteButton,
        setColor: activeButton.setColor,
    }

    return that

}
;
function Div (className) {
    var div = document.createElement('div')
    div.className = className
    return div
}
;
function EditColorPanel (updateListener) {

    function abortTouches () {
        hueSlider.abortTouch()
        saturationSlider.abortTouch()
        luminanceSlider.abortTouch()
    }

    function update () {
        updateListener(hue, saturation, luminance, alpha)
    }

    var hue = 0, saturation = 0, luminance = 0, alpha = 1

    var classPrefix = 'EditColorPanel'

    var hueSlider = HueSlider(function (_hue) {
        hue = _hue
        update()
        saturationSlider.setHue(hue)
        luminanceSlider.setHue(hue)
        alphaSlider.setHue(hue)
    }, update)

    var saturationSlider = SaturationSlider(function (_saturation) {
        saturation = _saturation
        update()
        luminanceSlider.setSaturation(saturation)
        alphaSlider.setSaturation(saturation)
    }, update)

    var luminanceSlider = LuminanceSlider(function (_luminance) {
        luminance = _luminance
        update()
        saturationSlider.setLuminance(luminance)
        alphaSlider.setLuminance(luminance)
    }, update)

    var alphaSlider = AlphaSlider(function (_alpha) {
        alpha = _alpha
        update()
    }, update)

    var element = Div(classPrefix)
    element.appendChild(hueSlider.element)
    element.appendChild(saturationSlider.element)
    element.appendChild(luminanceSlider.element)
    element.appendChild(alphaSlider.element)

    return {
        element: element,
        hide: function () {
            abortTouches()
            alphaSlider.abortTouch()
            element.classList.remove('visible')
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {

            abortTouches()

            hue = _hue
            saturation = _saturation
            luminance = _luminance
            alpha = _alpha

            hueSlider.setHue(hue)

            saturationSlider.setHue(hue)
            saturationSlider.setSaturation(saturation)
            saturationSlider.setLuminance(luminance)

            luminanceSlider.setHue(hue)
            luminanceSlider.setSaturation(saturation)
            luminanceSlider.setLuminance(luminance)

            alphaSlider.setHue(hue)
            alphaSlider.setSaturation(saturation)
            alphaSlider.setLuminance(luminance)
            alphaSlider.setAlpha(alpha)

        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
;
function FileButton (icon, openListener) {

    function newInput () {
        var input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.className = 'FileButton-input'
        input.addEventListener('change', function () {
            var reader = new FileReader
            reader.readAsDataURL(input.files[0])
            reader.onload = function () {
                var image = new Image
                image.src = reader.result
                image.onload = function () {
                    openListener(image)
                }
                image.onabort = function () {
                    // TODO
                }
                image.onerror = function () {
                    // TODO
                }
            }
            reader.onabort = function () {
                // TODO
            }
            reader.onerror = function () {
                // TODO
            }
            element.removeChild(input)
            newInput()
        })
        element.appendChild(input)
    }

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)

    newInput()

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
    }

}
;
function FilePanel (newListener, openListener, saveListener) {

    var classPrefix = 'FilePanel'

    var newButton = BarButton('file', newListener)
    newButton.addClass(classPrefix + '-newButton')

    var openButton = FileButton('open', openListener)
    openButton.addClass(classPrefix + '-openButton')

    var saveButton = BarButton('save', saveListener)
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(newButton.element)
    contentElement.appendChild(openButton.element)
    contentElement.appendChild(saveButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var classList = contentElement.classList

    return {
        element: element,
        hide: function () {
            classList.remove('visible')
        },
        show: function () {
            classList.add('visible')
        },
    }

}
;
function HueSlider (changeListener, endListener) {

    var slider = Slider(function (ratio) {
        changeListener(ratio * 360)
    }, endListener)
    slider.addClass('HueSlider')

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setHue: function (hue) {
            slider.setRatio(hue / 360)
        },
    }

}
;
function LuminanceSlider (changeListener, endListener) {

    function updateBar () {
        var black = 'hsl(' + hue + ', ' + saturation + '%, 0%)'
        var color = 'hsl(' + hue + ', ' + saturation + '%, 50%)'
        var white = 'hsl(' + hue + ', ' + saturation + '%, 100%)'
        var shadowStops = 'rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)'
        portraitBarElement.style.backgroundImage =
            'linear-gradient(' + shadowStops + '), ' +
            'linear-gradient(90deg, ' + black + ', ' + color + ', ' + white + ')'
        landscapeBarElement.style.backgroundImage =
            'linear-gradient(90deg, ' + shadowStops + '), ' +
            'linear-gradient(' + white + ', ' + color + ', ' + black + ')'
    }

    var hue = 0, saturation = 0

    var classPrefix = 'LuminanceSlider'

    var portraitBarElement = Div(classPrefix + '-portraitBar')

    var landscapeBarElement = Div(classPrefix + '-landscapeBar')

    var slider = Slider(function (ratio) {
        changeListener(ratio * 100)
    }, endListener)
    slider.addClass(classPrefix)
    slider.barElement.appendChild(portraitBarElement)
    slider.barElement.appendChild(landscapeBarElement)

    updateBar()

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setHue: function (_hue) {
            hue = _hue
            updateBar()
        },
        setLuminance: function (luminance) {
            slider.setRatio(luminance / 100)
        },
        setSaturation: function (_saturation) {
            saturation = _saturation
            updateBar()
        },
    }

}
;
function MainBar (pickPanel) {

    var classPrefix = 'MainBar'

    var alternativeBarElement = Div(classPrefix + '-alternativeBar')
    alternativeBarElement.appendChild(pickPanel.element)

    var barElement = Div(classPrefix + '-bar')

    var scrollElement = Div(classPrefix + '-scroll')
    scrollElement.appendChild(barElement)
    scrollElement.appendChild(alternativeBarElement)

    var element = Div(classPrefix)
    element.appendChild(scrollElement)

    var classList = scrollElement.classList

    return {
        element: element,
        addButton: function (button) {
            barElement.appendChild(button.element)
        },
        slide: function () {
            classList.add('slide')
        },
        unslide: function () {
            classList.remove('slide')
        },
    }

}
;
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

    function setCurrentToolColor (hue, saturation, luminance, alpha, button) {
        if (button == pencilTool.colorButton) {
            setPencilColor(hue, saturation, luminance, alpha)
        }
        if (button == eraserTool.colorButton) {
            setEraserColor(hue, saturation, luminance, alpha)
        }
        paramsPanel.setColor(hue, saturation, luminance)
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

    var palettePanel = PalettePanel(setCurrentToolColor, function () {
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
    }, function (activeButton) {

        var color = activeButton.color
        pickPanel.setColor(color.hue, color.saturation, color.luminance, 1)

        pickTool.enable()
        palettePanel.hide()
        mainBar.slide()

    })

    var pencilTool = PencilTool(pencilSize, canvas)
    pencilTool.colorButton = palettePanel.blackButton
    pencilTool.enable()

    var eraserTool = PencilTool(eraserSize, canvas)
    eraserTool.colorButton = palettePanel.whiteButton

    var pickTool = PickTool(canvas, function (hue, saturation, luminance) {
        pickPanel.setColor(hue, saturation, luminance, 1)
    })

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
        var canvasElement = canvas.element,
            width = canvasElement.offsetWidth,
            height = canvasElement.offsetHeight
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

    var pickPanel = PickPanel(function (hue, saturation, luminance) {
        palettePanel.pickColor(hue, saturation, luminance)
        setCurrentToolColor(hue, saturation, luminance, 1, palettePanel.getActiveButton())
    }, function () {
        pickTool.disable()
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
;
function OpenImage (c, image, visibleWidth, visibleHeight) {

    var canvas = c.canvas,
        visibleRatio = visibleWidth / visibleHeight,
        imageRatio = image.width / image.height,
        targetWidth, targetHeight

    if (visibleRatio > imageRatio) {
        targetWidth = visibleWidth
        targetHeight = targetWidth / imageRatio
    } else {
        targetHeight = visibleHeight
        targetWidth = targetHeight * imageRatio
    }

    var x = (canvas.width - targetWidth) / 2,
        y = (canvas.height - targetHeight) / 2
    c.globalAlpha = 1
    c.drawImage(image, x, y, targetWidth, targetHeight)

}
;
function PalettePanel (colorListener, closeListener, buttonListener, pickListener) {

    function selectColor (color) {
        var hue = color.hue,
            saturation = color.saturation,
            luminance = color.luminance,
            alpha = color.alpha
        previewButton.setColor(hue, saturation, luminance, alpha)
        editColorPanel.setColor(hue, saturation, luminance, alpha)
    }

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (button) {
        activeButton = button
        buttonListener(button)
        var color = button.color
        selectColor(color)
        colorListener(color.hue, color.saturation, color.luminance, color.alpha, button)
        if (!previewButton.isChecked()) closeListener()
    })

    var previewButton = ColorButton(function () {
        if (!visible) return
        if (previewButton.isChecked()) {
            editColorPanel.hide()
            previewButton.uncheck()
            editVisible = false
        } else {
            editColorPanel.show()
            previewButton.check()
            editVisible = true
        }
    })
    previewButton.setColor(0, 0, 0, 1)
    previewButton.addClass(classPrefix + '-previewButton')

    var editColorPanel = EditColorPanel(function (hue, saturation, luminance, alpha) {
        previewButton.setColor(hue, saturation, luminance, alpha)
        colorButtonsPanel.setColor(hue, saturation, luminance, alpha)
        colorListener(hue, saturation, luminance, alpha, activeButton)
    })

    var pickButton = PickButton(function () {
        pickListener(activeButton)
    })

    var secondLayerElement = Div(classPrefix + '-secondLayer')
    secondLayerElement.appendChild(colorButtonsPanel.element)
    secondLayerElement.appendChild(previewButton.element)
    secondLayerElement.appendChild(pickButton.element)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(editColorPanel.element)
    contentElement.appendChild(secondLayerElement)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var visible = false,
        editVisible = false

    var activeButton = colorButtonsPanel.blackButton

    return {
        blackButton: colorButtonsPanel.blackButton,
        element: element,
        whiteButton: colorButtonsPanel.whiteButton,
        getActiveButton: function () {
            return activeButton
        },
        hide: function () {
            if (visible) {
                editColorPanel.hide()
                contentElement.classList.remove('visible')
                visible = false
            }
        },
        select: function (button) {
            activeButton = button
            colorButtonsPanel.select(button)
            selectColor(button.color)
        },
        pickColor: function (hue, saturation, luminance) {
            var alpha = previewButton.color.alpha
            previewButton.setColor(hue, saturation, luminance, alpha)
            colorButtonsPanel.setColor(hue, saturation, luminance, alpha)
        },
        show: function () {
            if (!visible) {
                if (editVisible) editColorPanel.show()
                contentElement.classList.add('visible')
                visible = true
            }
        },
    }

}
;
function ParamsPanel (changeListener, closeListener) {

    function updatePreview () {
        previewC.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
        previewC.beginPath()
        previewC.arc(previewCanvas.width / 2, previewCanvas.height / 2, (size + 1) / 2, 0, Math.PI * 2)
        previewC.fill()
    }

    var classPrefix = 'ParamsPanel'

    var minSize = 1, maxSize = 48

    var previewCanvas = document.createElement('canvas')
    previewCanvas.width = previewCanvas.height = maxSize + 4
    previewCanvas.className = classPrefix + '-previewCanvas'

    var previewC = previewCanvas.getContext('2d')

    var slider = Slider(function (ratio) {
        size = minSize + ratio * maxSize
        changeListener(size)
        updatePreview()
    }, closeListener)
    slider.addClass(classPrefix + '-slider')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(slider.element)
    contentElement.appendChild(previewCanvas)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var previewChanged = false

    var size = minSize

    return {
        element: element,
        hide: function () {
            slider.abortTouch()
            contentElement.classList.remove('visible')
        },
        setColor: function (hue, saturation, luminance) {
            previewC.fillStyle = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)'
            previewChanged = true
        },
        setSize: function (_size) {
            size = _size
            previewChanged = true
        },
        show: function () {
            if (previewChanged) {
                updatePreview()
                previewChanged = false
                slider.setRatio((size - minSize) / (maxSize - minSize))            
            }
            contentElement.classList.add('visible')
        },
    }

}
;
function PencilTool (size, canvas) {

    function beginTool (x, y) {
        ;(function (size, halfSize, hsl) {
            canvas.operate(function (c) {
                c.lineWidth = size
                c.fillStyle = hsl
                c.beginPath()
                c.arc(x, y, halfSize, 0, Math.PI * 2)
                c.fill()
            })
        })(size, halfSize, hsl)
    }

    function mouseDown (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else {
            isMouseDown = true
            var rect = canvasElement.getBoundingClientRect()
            mouseX = e.clientX - rect.left
            mouseY = e.clientY - rect.top
            beginTool(mouseX, mouseY)
        }
    }

    function mouseUp () {
        if (touched) touched = false
        else isMouseDown = false
    }

    function mouseMove (e) {
        if (touched) touched = false
        else if (isMouseDown) {
            var rect = canvasElement.getBoundingClientRect()
            var x = e.clientX - rect.left,
                y = e.clientY - rect.top
            moveTool(mouseX, mouseY, x, y)
            mouseX = x
            mouseY = y
        }
    }

    function moveTool (oldX, oldY, x, y) {
        ;(function (size, hsl) {
            canvas.operate(function (c) {
                c.lineWidth = size
                c.strokeStyle = hsl
                c.beginPath()
                c.moveTo(oldX, oldY)
                c.lineTo(x, y)
                c.stroke()
            })
        })(size, hsl)
    }

    function touchEnd (e) {
        touched = true
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            delete activeTouches[touches[i].identifier]
        }
    }

    function touchMove (e) {
        touched = true
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {

            var touch = touches[i]
            var activeTouch = activeTouches[touch.identifier]
            if (!activeTouch) continue

            var x = touch.clientX - rect.left,
                y = touch.clientY - rect.top
            moveTool(activeTouch.x, activeTouch.y, x, y)
            activeTouch.x = x
            activeTouch.y = y

        }
    }

    function touchStart (e) {
        touched = true
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i],
                x = touch.clientX - rect.left,
                y = touch.clientY - rect.top
            beginTool(x, y)
            activeTouches[touch.identifier] = { x: x, y: y }
        }
    }

    var mouseX, mouseY, isMouseDown = false
    var touched = false
    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas
    var hue = 0, saturation = 0, luminance = 0, alpha = 1
    var hsl = 'hsla(0, 0%, 0%, 1)'

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            canvasElement.removeEventListener('mousemove', mouseMove)
            canvasElement.removeEventListener('mouseup', mouseUp)
            canvasElement.removeEventListener('touchstart', touchStart)
            canvasElement.removeEventListener('touchmove', touchMove)
            canvasElement.removeEventListener('touchend', touchEnd)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            canvasElement.addEventListener('mousemove', mouseMove)
            canvasElement.addEventListener('mouseup', mouseUp)
            canvasElement.addEventListener('touchstart', touchStart)
            canvasElement.addEventListener('touchmove', touchMove)
            canvasElement.addEventListener('touchend', touchEnd)
            enabled = true
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {
            hue = _hue
            saturation = _saturation
            luminance = _luminance
            alpha = _alpha
            hsl = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, ' + alpha + ')'
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
        },
    }

}
;
function PickButton (clickListener) {
    var button = BarButton('pick', clickListener)
    button.addClass('PickButton')
    return button
}
;
function PickPanel (pickListener, closeListener) {

    var classPrefix = 'PickPanel'

    var colorButton = ColorButton(function () {
        var color = colorButton.color
        pickListener(color.hue, color.saturation, color.luminance)
        closeListener()
    })
    colorButton.addClass(classPrefix + '-colorButton')

    var cancelButton = BarButton('cancel', closeListener)
    cancelButton.addClass(classPrefix + '-cancelButton')

    var element = Div(classPrefix)
    element.appendChild(colorButton.element)
    element.appendChild(cancelButton.element)

    return {
        element: element,
        setColor: colorButton.setColor,
    }

}
;
function PickTool (canvas, pickListener) {

    function mouseDown (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else {
            isMouseDown = true
            pick(e)
        }
    }

    function mouseMove (e) {
        e.preventDefault()
        if (touched) touched = false
        else if (isMouseDown) pick(e)
    }

    function mouseUp (e) {
        e.preventDefault()
        isMouseDown = false
    }

    function pick (e) {
        var rect = canvasElement.getBoundingClientRect(),
            x = Math.floor(e.clientX - rect.left),
            y = Math.floor(e.clientY - rect.top),
            data = imageData.data,
            offset = (x + y * canvasWidth) * 4,
            hsl = rgb2hsl(data[offset], data[offset + 1], data[offset + 2])
        pickListener(hsl.hue, hsl.saturation, hsl.luminance)
    }

    function touchEnd (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                break
            }
        }
    }

    function touchMove (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                pick(touch)
                break
            }
        }
    }

    function touchStart (e) {
        e.preventDefault()
        touched = true
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        pick(touch)
    }

    var imageData,
        touched = false,
        identifier = null,
        enabled = false,
        isMouseDown = false,
        canvasElement = canvas.canvas,
        canvasWidth = canvasElement.width,
        c = canvasElement.getContext('2d')

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            canvasElement.removeEventListener('mousemove', mouseMove)
            canvasElement.removeEventListener('mouseup', mouseUp)
            canvasElement.removeEventListener('touchend', touchEnd)
            canvasElement.removeEventListener('touchmove', touchMove)
            canvasElement.removeEventListener('touchstart', touchStart)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            canvasElement.addEventListener('mousemove', mouseMove)
            canvasElement.addEventListener('mouseup', mouseUp)
            canvasElement.addEventListener('touchend', touchEnd)
            canvasElement.addEventListener('touchmove', touchMove)
            canvasElement.addEventListener('touchstart', touchStart)
            enabled = true
            imageData = c.getImageData(0, 0, canvasWidth, canvasElement.height)
        },
    }

}
;
function rgb2hsl (r, g, b) {
    var max, min, h, s, l, d
    r /= 255
    g /= 255
    b /= 255
    max = Math.max(r, g, b)
    min = Math.min(r, g, b)
    l = (max + min) / 2
    if (max == min) {
        h = s = 0
    } else {
        d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
        }
        h /= 6
    }
    h = Math.floor(h * 360)
    s = Math.floor(s * 100)
    l = Math.floor(l * 100)
    return {
        hue: h,
        saturation: s,
        luminance: l,
    }
}
;
function SaveCanvas (canvas, width, height) {

    var croppedImage = document.createElement('canvas')
    croppedImage.width = width
    croppedImage.height = height

    var x = (width - canvas.width) / 2,
        y = (height - canvas.height) / 2

    var c = croppedImage.getContext('2d')
    c.drawImage(canvas, x, y)

    var a = document.createElement('a')
    a.href = croppedImage.toDataURL('image/png')
    a.download = 'picture.png'
    a.style.position = 'absolute'
    a.style.top = a.style.left = 0
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

}
;
function SaturationSlider (changeListener, endListener) {

    function updateBar () {
        var color = 'hsl(' + hue + ', 100%, ' + luminance + '%)'
        var grey = 'hsl(' + hue + ', 0%, ' + luminance + '%)'
        var shadowStops = 'rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)'
        portraitBarElement.style.backgroundImage =
            'linear-gradient(' + shadowStops + '), ' +
            'linear-gradient(90deg, ' + grey + ', ' + color + ')'
        landscapeBarElement.style.backgroundImage =
            'linear-gradient(90deg, ' + shadowStops + '), ' +
            'linear-gradient(' + color + ', ' + grey + ')'
    }

    var hue = 0, luminance = 0

    var classPrefix = 'SaturationSlider'

    var portraitBarElement = Div(classPrefix + '-portraitBar')

    var landscapeBarElement = Div(classPrefix + '-landscapeBar')

    var slider = Slider(function (ratio) {
        changeListener(ratio * 100)
    }, endListener)
    slider.addClass(classPrefix)
    slider.barElement.appendChild(portraitBarElement)
    slider.barElement.appendChild(landscapeBarElement)

    updateBar()

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setHue: function (_hue) {
            hue = _hue
            updateBar()
        },
        setLuminance: function (_luminance) {
            luminance = _luminance
            updateBar()
        },
        setSaturation: function (saturation) {
            slider.setRatio(saturation / 100)
        },
    }

}
;
function Slider (changeListener, endListener) {

    function beginSlide (e) {

        function change (e) {

            var rect = handleWrapperElement.getBoundingClientRect()
            var handleSize = handleElement.offsetHeight

            if (innerWidth > innerHeight) {
                var wrapperHeight = handleWrapperElement.offsetHeight
                ratio = 1 - (e.clientY - rect.top - handleSize / 2) / wrapperHeight
            } else {
                var wrapperWidth = handleWrapperElement.offsetWidth
                ratio = (e.clientX - rect.left - handleSize / 2) / wrapperWidth
            }

            ratio = Math.max(0, Math.min(1, ratio))
            updateHandle()
            changeListener(ratio)

        }

        function end () {
            endSlide()
            endListener()
        }

        function mouseMove (e) {
            if (touched) touched = false
            else change(e)
        }

        function mouseUp () {
            if (touched) touched = false
            else end()
        }

        function touchEnd (e) {
            touched = true
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === identifier) {
                    e.preventDefault()
                    end()
                    break
                }
            }
        }

        function touchMove (e) {
            touched = true
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i]
                if (touch.identifier === identifier) {
                    e.preventDefault()
                    change(touch)
                    break
                }
            }
        }

        endSlide = function () {
            sliding = false
            identifier = null
            handleClassList.remove('active')
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
            removeEventListener('touchmove', touchMove)
            removeEventListener('touchend', touchEnd)
        }

        sliding = true
        change(e)
        handleClassList.add('active')
        addEventListener('mousemove', mouseMove)
        addEventListener('mouseup', mouseUp)
        addEventListener('touchmove', touchMove)
        addEventListener('touchend', touchEnd)

    }

    function updateHandle () {
        handleElement.style.top = (1 - ratio) * 100 + '%'
        handleElement.style.left = ratio * 100 + '%'
    }

    var sliding = false
    var classPrefix = 'Slider'
    var touched = false
    var identifier = null
    var ratio = 0

    var handleElement = Div(classPrefix + '-handle')

    var handleClassList = handleElement.classList

    var handleWrapperElement = Div(classPrefix + '-handleWrapper')
    handleWrapperElement.appendChild(handleElement)

    var barElement = Div(classPrefix + '-bar')

    var element = Div(classPrefix)
    element.appendChild(barElement)
    element.appendChild(handleWrapperElement)
    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else beginSlide(e)
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        if (identifier === null) {
            e.preventDefault()
            var touch = e.changedTouches[0]
            identifier = touch.identifier
            beginSlide(touch)
        }
    })

    updateHandle()

    return {
        barElement: barElement,
        element: element,
        abortTouch: function () {
            if (sliding) endSlide()
        },
        addClass: function (className) {
            element.classList.add(className)
        },
        setRatio: function (_ratio) {
            ratio = _ratio
            updateHandle()
        },
    }

}
;
function ToolButton (icon, clickListener) {

    var barButton = BarButton(icon, clickListener)

    var classPrefix = 'ToolButton'

    var opaqueElement = Div(classPrefix + '-opaque')

    var colorElement = Div(classPrefix + '-color')
    colorElement.appendChild(opaqueElement)

    var transparencyElement = Div(classPrefix + '-transparency')
    transparencyElement.style.backgroundImage = 'url(images/color-background.svg)'
    transparencyElement.appendChild(colorElement)

    var element = barButton.element

    var classList = element.classList

    barButton.contentElement.appendChild(transparencyElement)

    return {
        addClass: barButton.addClass,
        check: barButton.check,
        element: element,
        isChecked: barButton.isChecked,
        uncheck: barButton.uncheck,
        mark: function () {
            classList.add('marked')
        },
        setColor: function (hue, saturation, luminance, alpha) {

            var hslPart = hue + ', ' + saturation + '%, ' + luminance + '%'

            var hsla = 'hsla(' + hslPart + ', ' + alpha + ')'
            colorElement.style.background = hsla

            var hsl = 'hsl(' + hslPart + ')'
            opaqueElement.style.background = hsl

        },
        unmark: function () {
            classList.remove('marked')
        },
    }

}
;
function UndoButton (undoListener) {

    function beginUndo () {

        function endUndo () {
            removeEventListener('mouseup', mouseUp)
            removeEventListener('touchend', touchEnd)
            classList.remove('active')
            clearInterval(repeatInterval)
        }

        function mouseUp () {
            if (touched) touched = false
            else endUndo()
        }

        function touchEnd (e) {
            touched = true
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === identifier) {
                    identifier = null
                    endUndo()
                }
            }
        }

        var touched = false

        addEventListener('touchend', touchEnd)
        addEventListener('mouseup', mouseUp)
        classList.add('active')
        repeatInterval = setInterval(undoListener, 50)
        undoListener()

    }

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/undo.svg)'

    var element = Div('Button UndoButton disabled')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else beginUndo()
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        if (identifier === null) {
            e.preventDefault()
            identifier = e.changedTouches[0].identifier
            beginUndo()
        }
    })

    var touched = false
    var identifier = null
    var repeatInterval
    var classList = element.classList

    return {
        element: element,
        disable: function () {
            classList.add('disabled')
        },
        enable: function () {
            classList.remove('disabled')
        },
    }

}
;
(function () {

    var progressElement = Div('Main-progress')

    var loadBarElement = Div('Main-loadBar')
    loadBarElement.appendChild(progressElement)

    document.body.appendChild(loadBarElement)

    var finished = 0
    var icons = ['pencil', 'eraser', 'palette', 'params', 'undo', 'burger']
    icons.forEach(function (icon) {
        var image = new Image
        image.src = 'images/' + icon + '.svg'
        image.onload = image.onerror = image.onabort = function () {
            finished++
            progressElement.style.width = finished / icons.length * 100 + '%'
            if (finished == icons.length) {
                var mainPanel = MainPanel()
                document.body.removeChild(loadBarElement)
                document.body.appendChild(mainPanel.element)
            }
        }
    })

})()
;

})()