function ColorButtonsPanel (selectListener) {

    function createButton (hue, saturation, luminance, alpha) {
        var button = ColorButton(function () {
            select(button)
            selectListener(button)
        })
        button.setColor(hue, saturation, luminance, alpha)
        button.addClass(classPrefix + '-colorButton')
        buttons.push(button)
        return button
    }

    function select (button) {
        buttons.forEach(function (button) {
            button.uncheck()
        })
        button.check()
        activeButton = button
    }

    var buttons = []

    var classPrefix = 'ColorButtonsPanel'

    var blackButton = createButton(0, 0, 0, 1)
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()
    blackButton.mark()

    var redButton = createButton(4, 100, 47, 1)
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = createButton(115, 87, 50, 1)
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = createButton(232, 100, 50, 1)
    blueButton.addClass(classPrefix + '-blueButton')

    var greyButton = createButton(0, 0, 53, 1)
    greyButton.addClass(classPrefix + '-greyButton')

    var brownButton = createButton(30, 100, 33, 1)
    brownButton.addClass(classPrefix + '-brownButton')

    var darkGreenButton = createButton(114, 100, 33, 1)
    darkGreenButton.addClass(classPrefix + '-darkGreenButton')

    var skyBlueButton = createButton(210, 100, 80, 1)
    skyBlueButton.addClass(classPrefix + '-skyBlueButton')

    var yellowButton = createButton(60, 100, 50, 1)
    yellowButton.addClass(classPrefix + '-yellowButton')

    var orangeButton = createButton(32, 100, 50, 1)
    orangeButton.addClass(classPrefix + '-orangeButton')

    var violetButton = createButton(306, 100, 33, 1)
    violetButton.addClass(classPrefix + '-violetButton')

    var pinkButton = createButton(312, 100, 83, 1)
    pinkButton.addClass(classPrefix + '-pinkButton')

    var whiteButton = createButton(0, 0, 100, 1)
    whiteButton.addClass(classPrefix + '-whiteButton')
    whiteButton.mark()

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
        element: element,
        select: select,
        whiteButton: whiteButton,
        setColor: function (hue, saturation, luminance, alpha) {
            activeButton.setColor(hue, saturation, luminance, alpha)
        },
    }

}
