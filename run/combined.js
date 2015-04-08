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

    function addListeners () {
        element.addEventListener('mousedown', mouseDown)
        element.addEventListener('touchstart', touchStart)
    }

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    function mouseDown (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    }

    function setIcon (icon) {
        contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'
    }

    function touchStart (e) {
        touched = true
        e.preventDefault()
        click()
    }

    var touched = false

    var contentElement = Div('Button-content')

    var element = Div('Button')
    element.appendChild(contentElement)

    var activeTimeout
    var checked = false
    var classList = element.classList

    setIcon(icon)
    addListeners()

    return {
        contentElement: contentElement,
        element: element,
        setIcon: setIcon,
        addClass: function (className) {
            classList.add(className)
        },
        check: function () {
            classList.add('checked')
            checked = true
        },
        disable: function () {
            classList.add('disabled')
            element.removeEventListener('mousedown', mouseDown)
            element.removeEventListener('touchstart', touchStart)
        },
        enable: function () {
            classList.remove('disabled')
            addListeners()
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
function BucketTool (canvas) {

    function mouseDown (e) {

        var rect = canvasElement.getBoundingClientRect(),
            mouseX = Math.floor(e.clientX - rect.left),
            mouseY = Math.floor(e.clientY - rect.top)

        var c = canvasElement.getContext('2d')

        var imageData = c.getImageData(mouseX, mouseY, 1, 1),
            imageDataData = imageData.data

        var rMatch = imageDataData[0],
            gMatch = imageDataData[1],
            bMatch = imageDataData[2]

        ;(function (red, green, blue, alpha) {

            var invertedAlpha = 1 - alpha

            var redAlpha = red * alpha,
                greenAlpha = green * alpha,
                blueAlpha = blue * alpha

            canvas.operate(function (c) {

                function enqueue (x, y) {

                    if (x < wrapperLeft || x == wrapperRight ||
                        y < wrapperTop || y == wrapperBottom) return

                    if (passed[y]) {
                        if (passed[y][x]) return
                    } else {
                        passed[y] = Object.create(null)
                    }

                    passed[y][x] = true
                    queue.push([x, y])

                }

                var width = canvasElement.width,
                    height = canvasElement.height

                var imageData = c.getImageData(0, 0, width, height)
                var imageDataData = imageData.data

                var queue = []
                var passed = Object.create(null)
                enqueue(mouseX, mouseY)

                var neighbors = Object.create(null)

                var maxDifference = 20

                while (queue.length) {

                    var coords = queue.shift()

                    var pixelX = coords[0],
                        pixelY = coords[1]

                    var rIndex = (pixelY * width + pixelX) * 4,
                        gIndex = rIndex + 1,
                        bIndex = gIndex + 1

                    var r = imageDataData[rIndex],
                        g = imageDataData[gIndex],
                        b = imageDataData[bIndex]

                    var diffR = Math.abs(rMatch - r),
                        diffG = Math.abs(gMatch - g),
                        diffB = Math.abs(bMatch - b)

                    var difference = Math.max(diffR, diffG, diffB)
                    if (difference > maxDifference) {
                        if (!neighbors[pixelY]) neighbors[pixelY] = Object.create(null)
                        neighbors[pixelY][pixelX] = true
                        continue
                    }

                    imageDataData[rIndex] = redAlpha + r * invertedAlpha
                    imageDataData[gIndex] = greenAlpha + g * invertedAlpha
                    imageDataData[bIndex] = blueAlpha + b * invertedAlpha

                    enqueue(pixelX + 1, pixelY)
                    enqueue(pixelX - 1, pixelY)
                    enqueue(pixelX, pixelY + 1)
                    enqueue(pixelX, pixelY - 1)

                }

                for (var y in neighbors) {
                    var xs = neighbors[y]
                    for (var x in xs) {

                        var rIndex = (y * width + Number(x)) * 4,
                            gIndex = rIndex + 1,
                            bIndex = gIndex + 1

                        var r = imageDataData[rIndex],
                            g = imageDataData[gIndex],
                            b = imageDataData[bIndex]

                        imageDataData[rIndex] = ((r + red) / 2 + redAlpha + r * invertedAlpha) / 2
                        imageDataData[gIndex] = ((g + green) / 2 + greenAlpha + g * invertedAlpha) / 2
                        imageDataData[bIndex] = ((b + blue) / 2 + blueAlpha + r * invertedAlpha) / 2

                    }
                }

                c.putImageData(imageData, 0, 0)

            })

        })(red, green, blue, alpha)

    }

    var red = 0,
        green = 0,
        blue = 0,
        alpha = 1

    var canvasElement = canvas.canvas

    var enabled = false

    var wrapperTop, wrapperRight, wrapperBottom, wrapperLeft

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            enabled = true
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {
            var rgb = hsl2rgb(_hue, _saturation, _luminance)
            red = rgb.r
            green = rgb.g
            blue = rgb.b
            alpha = _alpha
        },
        resize: function (wrapperWidth, wrapperHeight) {

            var halfWidth = canvasElement.width / 2,
                halfHeight = canvasElement.height / 2

            var halfWrapperWidth = wrapperWidth / 2,
                halfWrapperHeight = wrapperHeight / 2

            wrapperTop = Math.floor(halfHeight - halfWrapperHeight)
            wrapperRight = Math.floor(halfWidth + halfWrapperWidth)
            wrapperBottom = Math.ceil(halfHeight + halfWrapperHeight)
            wrapperLeft = Math.ceil(halfWidth - halfWrapperWidth)

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
function hsl2rgb (h, s, l) {

    var r, g, b, m, c, x

    if (!isFinite(h)) h = 0
    if (!isFinite(s)) s = 0
    if (!isFinite(l)) l = 0

    h /= 60
    if (h < 0) h = 6 - (-h % 6)
    h %= 6

    s = Math.max(0, Math.min(1, s / 100))
    l = Math.max(0, Math.min(1, l / 100))

    c = (1 - Math.abs((2 * l) - 1)) * s
    x = c * (1 - Math.abs((h % 2) - 1))

    if (h < 1) {
        r = c
        g = x
        b = 0
    } else if (h < 2) {
        r = x
        g = c
        b = 0
    } else if (h < 3) {
        r = 0
        g = c
        b = x
    } else if (h < 4) {
        r = 0
        g = x
        b = c
    } else if (h < 5) {
        r = x
        g = 0
        b = c
    } else {
        r = c
        g = 0
        b = x
    }

    m = l - c / 2
    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)

    return { r: r, g: g, b: b }

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
        show: function () {
            element.classList.add('visible')
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
        updateButtonColor(primaryToolButton, [pencilTool, bucketTool])
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

    var bucketTool = BucketTool(canvas)

    var eraserTool = PencilTool(eraserSize, canvas)

    var primaryTool = pencilTool

    var pickTool = PickTool(canvas, function (hue, saturation, luminance) {
        pickPanel.setColor(hue, saturation, luminance, 1)
    })

    var paramsPanel = ParamsPanel(function (size) {
        if (primaryToolOrEraserListener == primaryToolListener) {
            pencilSize = size
            if (primaryTool == pencilTool) {
                pencilTool.setSize(size)
            }
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
        isEditVisible: function () {
            return editVisible
        },
        select: function (button) {
            activeButton = button
            colorButtonsPanel.select(button)
            selectColor(button.color)
        },
        pickColor: function (hue, saturation, luminance) {
            var alpha = previewButton.color.alpha
            editColorPanel.setColor(hue, saturation, luminance, alpha)
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

        function mouseUp () {
            if (touched) touched = false
            else {
                removeEventListener('mousemove', mouseMove)
                removeEventListener('mouseup', mouseUp)
            }
        }

        function mouseMove (e) {
            if (touched) touched = false
            else {
                var rect = canvasElement.getBoundingClientRect(),
                    x = e.clientX - rect.left,
                    y = e.clientY - rect.top
                moveTool(mouseX, mouseY, x, y)
                mouseX = x
                mouseY = y
            }
        }

        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else {

            var rect = canvasElement.getBoundingClientRect(),
                mouseX = e.clientX - rect.left,
                mouseY = e.clientY - rect.top
            beginTool(mouseX, mouseY)

            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)

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
            canvasElement.removeEventListener('touchstart', touchStart)
            canvasElement.removeEventListener('touchmove', touchMove)
            canvasElement.removeEventListener('touchend', touchEnd)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
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

    function beginTool (e) {
        var xy = getXY(e)
        pick(xy[0], xy[1])
    }

    function getXY (e) {
        var rect = canvasElement.getBoundingClientRect(),
            x = Math.floor(e.clientX - rect.left),
            y = Math.floor(e.clientY - rect.top)
        return [x, y]
    }

    function mouseDown (e) {

        function mouseMove (e) {
            e.preventDefault()
            if (touched) touched = false
            else moveTool(e)
        }

        function mouseUp (e) {
            e.preventDefault()
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
        }

        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else {
            beginTool(e)
            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)
        }
    }

    function moveTool (e) {
        var xy = getXY(e), x = xy[0], y = xy[1]
        if (x >= 0 && x < canvasWidth &&
            y >= 0 && y < canvasHeight) pick(x, y)
    }

    function pick (x, y) {
        var offset = (x + y * canvasWidth) * 4,
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
                moveTool(touch)
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
        beginTool(touch)
    }

    var data,
        touched = false,
        identifier = null,
        enabled = false,
        canvasElement = canvas.canvas,
        canvasWidth = canvasElement.width,
        canvasHeight = canvasElement.height,
        c = canvasElement.getContext('2d')

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            canvasElement.removeEventListener('touchstart', touchStart)
            removeEventListener('touchmove', touchMove)
            removeEventListener('touchend', touchEnd)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            canvasElement.addEventListener('touchstart', touchStart)
            addEventListener('touchmove', touchMove)
            addEventListener('touchend', touchEnd)
            enabled = true
            data = c.getImageData(0, 0, canvasWidth, canvasHeight).data
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

        function endSlide () {
            sliding = false
            identifier = null
            handleClassList.remove('active')
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
            removeEventListener('touchmove', touchMove)
            removeEventListener('touchend', touchEnd)
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
        setIcon: barButton.setIcon,
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
function ToolPanel (pencilListener, bucketListener) {

    function hide () {
        classList.remove('visible')
        visible = false
    }

    var classPrefix = 'ToolPanel'

    var pencilButton = BarButton('pencil', function () {
        bucketButton.uncheck()
        pencilButton.check()
        pencilListener()
        hide()
    })
    pencilButton.addClass(classPrefix + '-pencilButton')
    pencilButton.check()

    var bucketButton = BarButton('bucket', function () {
        pencilButton.uncheck()
        bucketButton.check()
        bucketListener()
        hide()
    })
    bucketButton.addClass(classPrefix + '-bucketButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(pencilButton.element)
    contentElement.appendChild(bucketButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var classList = contentElement.classList

    var visible = false

    return {
        element: element,
        hide: hide,
        isVisible: function () {
            return visible
        },
        show: function () {
            classList.add('visible')
            visible = true
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

    var horizontalProgressElement = Div('Main-horizontalProgress')

    var verticalProgressElement = Div('Main-verticalProgress')

    var loadBarElement = Div('Main-loadBar')
    loadBarElement.appendChild(horizontalProgressElement)
    loadBarElement.appendChild(verticalProgressElement)

    var mainPanel = MainPanel()

    var body = document.body
    body.appendChild(mainPanel.element)
    body.appendChild(loadBarElement)

    var finished = 0
    var icons = ['bucket', 'burger', 'eraser',
        'palette', 'params', 'pencil', 'undo']
    icons.forEach(function (icon) {
        var image = new Image
        image.src = 'images/' + icon + '.svg'
        image.onload = image.onerror = image.onabort = function () {

            finished++

            var percent = finished / icons.length * 100 + '%'
            horizontalProgressElement.style.width = percent
            verticalProgressElement.style.height = percent

            if (finished == icons.length) {
                mainPanel.show()
                setTimeout(function () {
                    loadBarElement.classList.add('hidden')
                    setTimeout(function () {
                        body.removeChild(loadBarElement)
                    }, 250)
                }, 250)
            }

        }
    })

    var resize = mainPanel.resize
    addEventListener('resize', resize)
    resize()

})()
;

})()