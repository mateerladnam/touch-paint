(function () {
function AlphaSlider (changeListener, endListener) {

    function update () {
        var color = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)'
        var transparent = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, 0)'
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

    var slider = Slider(1, function (ratio) {
        changeListener(ratio)
        update()
    }, endListener)
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

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        clickListener()
        element.classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            element.classList.remove('active')
        }, 100)
    })

    var activeTimeout
    var checked = false

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        check: function () {
            element.classList.add('checked')
            checked = true
        },
        isChecked: function () {
            return checked
        },
        uncheck: function () {
            element.classList.remove('checked')
            checked = false
        },
    }

}
;
function BrushTool (size, canvas) {

    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas

    canvasElement.addEventListener('touchstart', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {

            var touch = touches[i],
                x = touch.clientX - rect.left,
                y = touch.clientY - rect.top

            ;(function (size, hsl, halfSize) {
                canvas.operate(function (c) {
                    c.lineWidth = size
                    c.strokeStyle = c.fillStyle = hsl
                    c.beginPath()
                    c.arc(x, y, halfSize, 0, Math.PI * 2)
                    c.fill()
                })
            })(size, hsl, halfSize)

            activeTouches[touch.identifier] = { x: x, y: y }

        }
    })
    canvasElement.addEventListener('touchmove', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            var activeTouch = activeTouches[touch.identifier]
            if (activeTouch) {

                var x = touch.clientX - rect.left,
                    y = touch.clientY - rect.top

                ;(function (size, hsl, oldX, oldY) {
                    canvas.operate(function (c) {
                        c.lineWidth = size
                        c.strokeStyle = c.fillStyle = hsl
                        c.beginPath()
                        c.moveTo(oldX, oldY)
                        c.lineTo(x, y)
                        c.stroke()
                    })
                })(size, hsl, activeTouch.x, activeTouch.y)

                activeTouch.x = x
                activeTouch.y = y

            }
        }
    })
    canvasElement.addEventListener('touchend', function (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            delete activeTouches[touches[i].identifier]
        }
    })

    var hue = 0, saturation = 0, luminance = 0, alpha = 1
    var hsl = 'hsla(0, 0%, 0%, 1)'

    return {
        disable: function () {
            enabled = false
        },
        enable: function () {
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
function Canvas () {

    function clear () {
        c.save()
        c.fillStyle = '#fff'
        c.fillRect(0, 0, size, size)
        c.restore()
    }

    var classPrefix = 'Canvas'

    var size = Math.max(screen.width, screen.height)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvas.height = size
    canvas.style.left = canvas.style.top = -size / 2 + 'px'

    var c = canvas.getContext('2d')
    c.lineCap = 'round'

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var undoCanvas = document.createElement('canvas')
    undoCanvas.width = undoCanvas.height = size

    var undoC = undoCanvas.getContext('2d')
    undoC.lineCap = 'round'
    undoC.fillStyle = '#fff'
    undoC.fillRect(0, 0, size, size)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    clear()

    var operations = []

    return {
        canvas: canvas,
        clear: clear,
        element: element,
        operate: function (operation) {
            operations.push(operation)
            operation(c)
            if (operations.length > 1024) operations.shift()(undoC)
        },
        undo: function () {
            c.drawImage(undoCanvas, 0, 0)
            if (operations.length) {
                operations.pop()
                operations.forEach(function (operation) {
                    operation(c)
                })
            }
        },
    }

}
;
function ColorButton (hue, saturation, luminance, alpha, clickListener) {

    function setColor (hue, saturation, luminance, alpha) {
        var hsl = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, ' + alpha + ')'
        colorElement.style.backgroundColor = hsl
    }

    var classPrefix = 'ColorButton'

    var colorElement = Div(classPrefix + '-color')

    var contentElement = Div(classPrefix + '-transparency Button-content')
    contentElement.appendChild(colorElement)
    contentElement.style.backgroundImage = 'url(images/color-background.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        clickListener()
        element.classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            element.classList.remove('active')
        }, 100)
    })

    var activeTimeout
    var checked = false

    setColor(hue, saturation, luminance, alpha)

    return {
        element: element,
        setColor: setColor,
        addClass: function (className) {
            element.classList.add(className)
        },
        check: function () {
            element.classList.add('checked')
            checked = true
        },
        isChecked: function () {
            return checked
        },
        uncheck: function () {
            element.classList.remove('checked')
            checked = false
        },
    }

}
;
function ColorButtonsPanel (selectListener) {

    function createColorButton (hue, saturation, luminance, alpha) {

        var button = ColorButton(hue, saturation, luminance, alpha, function () {
            items.forEach(function (item) {
                item.uncheck()
            })
            button.check()
            activeItem = item
            selectListener(hue, saturation, luminance, alpha)
        })
        button.addClass(classPrefix + '-colorButton')
        items.push(button)

        var item = {
            addClass: button.addClass,
            check: button.check,
            element: button.element,
            setColor: function (_hue, _saturation, _luminance, _alpha) {
                hue = _hue
                saturation = _saturation
                luminance = _luminance
                alpha = _alpha
                button.setColor(hue, saturation, luminance, alpha)
            },
        }

        return item

    }

    var items = []

    var classPrefix = 'ColorButtonsPanel'

    var blackButton = createColorButton(0, 0, 0, 1)
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()

    var redButton = createColorButton(4, 100, 47, 1)
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = createColorButton(115, 87, 50, 1)
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = createColorButton(232, 100, 50, 1)
    blueButton.addClass(classPrefix + '-blueButton')

    var greyButton = createColorButton(0, 0, 53, 1)
    greyButton.addClass(classPrefix + '-greyButton')

    var brownButton = createColorButton(30, 100, 33, 1)
    brownButton.addClass(classPrefix + '-brownButton')

    var darkGreenButton = createColorButton(114, 100, 33, 1)
    darkGreenButton.addClass(classPrefix + '-darkGreenButton')

    var skyBlueButton = createColorButton(210, 100, 80, 1)
    skyBlueButton.addClass(classPrefix + '-skyBlueButton')

    var yellowButton = createColorButton(60, 100, 50, 1)
    yellowButton.addClass(classPrefix + '-yellowButton')

    var orangeButton = createColorButton(32, 100, 50, 1)
    orangeButton.addClass(classPrefix + '-orangeButton')

    var violetButton = createColorButton(306, 100, 33, 1)
    violetButton.addClass(classPrefix + '-violetButton')

    var pinkButton = createColorButton(312, 100, 83, 1)
    pinkButton.addClass(classPrefix + '-pinkButton')

    var activeItem = blackButton

    var element = Div(classPrefix)
    element.appendChild(blackButton.element)
    element.appendChild(greyButton.element)
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

    return {
        element: element,
        setColor: function (hue, saturation, luminance, alpha) {
            activeItem.setColor(hue, saturation, luminance, alpha)
        },
    }

}
;
function Div (className) {
    var div = document.createElement('div')
    div.className = className
    return div
}
;
function EditColorPanel (updateListener) {

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
            hueSlider.abortTouch()
            saturationSlider.abortTouch()
            luminanceSlider.abortTouch()
            alphaSlider.abortTouch()
            element.classList.remove('visible')
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {

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
function EraserTool (size, canvas) {

    var color = '#fff'
    var activeTouches = {}
    var halfSize = size / 2
    var enabled = false
    var canvasElement = canvas.canvas

    canvasElement.addEventListener('touchstart', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {

            var touch = touches[i],
                x = touch.clientX - rect.left,
                y = touch.clientY - rect.top

            ;(function (size, halfSize) {
                canvas.operate(function (c) {
                    c.lineWidth = size
                    c.strokeStyle = c.fillStyle = color
                    c.beginPath()
                    c.arc(x, y, halfSize, 0, Math.PI * 2)
                    c.fill()
                })
            })(size, halfSize)

            activeTouches[touch.identifier] = { x: x, y: y }

        }
    })
    canvasElement.addEventListener('touchmove', function (e) {
        if (!enabled) return
        e.preventDefault()
        var rect = canvasElement.getBoundingClientRect()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            var activeTouch = activeTouches[touch.identifier]
            if (activeTouch) {

                var x = touch.clientX - rect.left,
                    y = touch.clientY - rect.top

                ;(function (size, oldX, oldY) {
                    canvas.operate(function (c) {
                        c.lineWidth = size
                        c.strokeStyle = c.fillStyle = color
                        c.beginPath()
                        c.moveTo(oldX, oldY)
                        c.lineTo(x, y)
                        c.stroke()
                    })
                })(size, activeTouch.x, activeTouch.y)

                activeTouch.x = x
                activeTouch.y = y
            }
        }
    })
    canvasElement.addEventListener('touchend', function (e) {
        e.preventDefault()
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            delete activeTouches[touches[i].identifier]
        }
    })

    return {
        disable: function () {
            enabled = false
        },
        enable: function () {
            enabled = true
        },
        setSize: function (_size) {
            size = _size
            halfSize = size / 2
            if (enabled) enable()
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

    return {
        element: element,
        hide: function () {
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
    }

}
;
function HueSlider (changeListener, endListener) {

    var slider = Slider(0, function (ratio) {
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

    var slider = Slider(0, function (ratio) {
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

    var palettePanel = PalettePanel(brushTool.setColor, function () {
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
        canvas.operate(canvas.clear)
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
;
function PalettePanel (colorListener, closeListener) {

    function closeEdit () {
        editColorPanel.hide()
        previewButton.uncheck()
    }

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (hue, saturation, luminance, alpha) {
        previewButton.setColor(hue, saturation, luminance, alpha)
        editColorPanel.setColor(hue, saturation, luminance, alpha)
        colorListener(hue, saturation, luminance, alpha)
        if (!previewButton.isChecked()) closeListener()
    })

    var previewButton = ColorButton(0, 0, 0, 1, function () {
        if (previewButton.isChecked()) {
            closeEdit()
        } else {
            editColorPanel.show()
            previewButton.check()
        }
    })
    previewButton.addClass(classPrefix + '-previewButton')

    var editColorPanel = EditColorPanel(function (hue, saturation, luminance, alpha) {
        previewButton.setColor(hue, saturation, luminance, alpha)
        colorButtonsPanel.setColor(hue, saturation, luminance, alpha)
        colorListener(hue, saturation, luminance, alpha)
    })

    var secondLayerElement = Div(classPrefix + '-secondLayer')
    secondLayerElement.appendChild(colorButtonsPanel.element)
    secondLayerElement.appendChild(previewButton.element)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(editColorPanel.element)
    contentElement.appendChild(secondLayerElement)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return {
        element: element,
        hide: function () {
            closeEdit()
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
    }

}
;
function ParamsPanel (brushSize, changeListener, closeListener) {

    var classPrefix = 'ParamsPanel'

    var minBrushSize = 1,
        maxBrushSize = 32,
        initialRatio = (brushSize - minBrushSize) / (maxBrushSize - minBrushSize)

    var slider = Slider(initialRatio, function (ratio) {
        changeListener(minBrushSize + ratio * maxBrushSize)
    }, closeListener)
    slider.addClass(classPrefix + '-slider')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(slider.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return {
        element: element,
        hide: function () {
            slider.abortTouch()
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
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

    var slider = Slider(0, function (ratio) {
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
function Slider (ratio, changeListener, endListener) {

    function change (touch) {

        var rect = handleWrapperElement.getBoundingClientRect()
        var handleSize = handleElement.offsetHeight

        if (innerWidth > innerHeight) {
            var wrapperHeight = handleWrapperElement.offsetHeight
            ratio = 1 - (touch.clientY - rect.top - handleSize / 2) / wrapperHeight
        } else {
            var wrapperWidth = handleWrapperElement.offsetWidth
            ratio = (touch.clientX - rect.left - handleSize / 2) / wrapperWidth
        }

        ratio = Math.max(0, Math.min(1, ratio))
        updateHandle()
        changeListener(ratio)

    }

    function finishTouch () {
        identifier = null
        handleElement.classList.remove('active')
        removeEventListener('touchmove', touchMove)
        removeEventListener('touchend', touchEnd)
    }

    function touchEnd (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                e.preventDefault()
                finishTouch()
                endListener()
                break
            }
        }
    }

    function touchMove (e) {
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

    function updateHandle () {
        handleElement.style.top = (1 - ratio) * 100 + '%'
        handleElement.style.left = ratio * 100 + '%'
    }

    var classPrefix = 'Slider'

    var identifier = null

    var handleElement = Div(classPrefix + '-handle')

    var handleWrapperElement = Div(classPrefix + '-handleWrapper')
    handleWrapperElement.appendChild(handleElement)

    var barElement = Div(classPrefix + '-bar')

    var element = Div(classPrefix)
    element.appendChild(barElement)
    element.appendChild(handleWrapperElement)
    element.addEventListener('touchstart', function (e) {
        if (identifier === null) {

            e.preventDefault()
            var touch = e.changedTouches[0]
            identifier = touch.identifier
            handleElement.classList.add('active')

            change(touch)

            addEventListener('touchmove', touchMove)
            addEventListener('touchend', touchEnd)

        }
    })

    updateHandle()

    return {
        barElement: barElement,
        element: element,
        abortTouch: function () {
            if (identifier !== null) finishTouch()
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
function UndoButton (undoListener) {

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/undo.svg)'

    var element = Div('Button UndoButton')
    element.appendChild(contentElement)
    element.addEventListener('touchstart', function (e) {

        function touchEnd (e) {
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === identifier) {
                    identifier = null
                    element.classList.remove('active')
                    removeEventListener('touchend', touchEnd)
                    clearInterval(repeatInterval)
                }
            }
        }

        if (identifier === null) {
            e.preventDefault()
            identifier = e.changedTouches[0].identifier
            element.classList.add('active')
            addEventListener('touchend', touchEnd)
            repeatInterval = setInterval(undoListener, 60)
            undoListener()
        }

    })

    var identifier = null
    var repeatInterval

    return { element: element }

}
;
(function () {
    var mainPanel = MainPanel()
    document.body.appendChild(mainPanel.element)
})()
;

})()