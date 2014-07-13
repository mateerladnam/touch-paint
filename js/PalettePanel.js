function PalettePanel (colorListener) {

    function createColorButton (color) {
        var button = ColorButton(color, function () {
            colorButtons.forEach(function (button) {
                button.uncheck()
            })
            button.check()
            colorListener(color)
        })
        button.addClass(classPrefix + '-colorButton')
        colorButtons.push(button)
        return button
    }

    var colorButtons = []

    var classPrefix = 'PalettePanel'

    var blackButton = createColorButton('#000')
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()

    var redButton = createColorButton('#e10')
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = createColorButton('#2e1')
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = createColorButton('#02f')
    blueButton.addClass(classPrefix + '-blueButton')

    var greyButton = createColorButton('#888')
    greyButton.addClass(classPrefix + '-greyButton')

    var brownButton = createColorButton('#a50')
    brownButton.addClass(classPrefix + '-brownButton')

    var darkGreenButton = createColorButton('#1a0')
    darkGreenButton.addClass(classPrefix + '-darkGreenButton')

    var skyBlueButton = createColorButton('#9cf')
    skyBlueButton.addClass(classPrefix + '-skyBlueButton')

    var yellowButton = createColorButton('#ff0')
    yellowButton.addClass(classPrefix + '-yellowButton')

    var orangeButton = createColorButton('#f80')
    orangeButton.addClass(classPrefix + '-orangeButton')

    var violetButton = createColorButton('#a09')
    violetButton.addClass(classPrefix + '-violetButton')

    var pinkButton = createColorButton('#fae')
    pinkButton.addClass(classPrefix + '-pinkButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(blackButton.element)
    contentElement.appendChild(greyButton.element)
    contentElement.appendChild(blueButton.element)
    contentElement.appendChild(skyBlueButton.element)
    contentElement.appendChild(darkGreenButton.element)
    contentElement.appendChild(greenButton.element)
    contentElement.appendChild(redButton.element)
    contentElement.appendChild(yellowButton.element)
    contentElement.appendChild(brownButton.element)
    contentElement.appendChild(orangeButton.element)
    contentElement.appendChild(violetButton.element)
    contentElement.appendChild(pinkButton.element)

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
