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
