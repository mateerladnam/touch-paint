function ColorButtonsPanel (selectListener) {

    function createColorButton (hue, saturation, luminance, alpha) {
        var button = ColorButton(function () {
            buttons.forEach(function (button) {
                button.uncheck()
            })
            button.check()
            activeButton = button
            var color = button.color
            selectListener(color.hue, color.saturation, color.luminance, color.alpha)
        })
        button.setColor(hue, saturation, luminance, alpha)
        button.addClass(classPrefix + '-colorButton')
        buttons.push(button)
        return button
    }

    var buttons = []

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

    var whiteButton = createColorButton(0, 0, 100, 1)
    whiteButton.addClass(classPrefix + '-whiteButton')

    var activeButton = blackButton

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
    element.appendChild(whiteButton.element)

    return {
        blackButton: blackButton,
        whiteButton: whiteButton,
        element: element,
        setColor: function (hue, saturation, luminance, alpha) {
            activeButton.setColor(hue, saturation, luminance, alpha)
        },
    }

}
