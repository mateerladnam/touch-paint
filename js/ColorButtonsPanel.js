function ColorButtonsPanel (selectListener) {

    function createColorButton (color) {
        var button = ColorButton(color, function () {
            buttons.forEach(function (button) {
                button.uncheck()
            })
            button.check()
            selectListener(color)
        })
        button.addClass(classPrefix + '-colorButton')
        buttons.push(button)
        return button
    }

    var buttons = []

    var classPrefix = 'ColorButtonsPanel'

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

    return { element: element }

}
