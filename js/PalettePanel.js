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

    var redButton = createColorButton('#f00')
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = createColorButton('#0f0')
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = createColorButton('#00f')
    blueButton.addClass(classPrefix + '-blueButton')

    var greyButton = createColorButton('#888')
    greyButton.addClass(classPrefix + '-greyButton')

    var brownButton = createColorButton('#a50')
    brownButton.addClass(classPrefix + '-brownButton')

    var darkGreenButton = createColorButton('#0a0')
    darkGreenButton.addClass(classPrefix + '-darkGreenButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(blackButton.element)
    contentElement.appendChild(redButton.element)
    contentElement.appendChild(greenButton.element)
    contentElement.appendChild(blueButton.element)
    contentElement.appendChild(greyButton.element)
    contentElement.appendChild(brownButton.element)
    contentElement.appendChild(darkGreenButton.element)

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
