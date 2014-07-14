function ColorButtonsPanel (selectListener) {

    function createColorButton (hue, saturation, luminance) {

        var button = ColorButton(hue, saturation, luminance, function () {
            items.forEach(function (item) {
                item.uncheck()
            })
            button.check()
            activeItem = item
            selectListener(hue, saturation, luminance)
        })
        button.addClass(classPrefix + '-colorButton')
        items.push(button)

        var item = {
            addClass: button.addClass,
            check: button.check,
            element: button.element,
            setColor: function (_hue, _saturation, _luminance) {
                hue = _hue
                saturation = _saturation
                luminance = _luminance
                button.setColor(hue, saturation, luminance)
            },
        }

        return item

    }

    var items = []

    var classPrefix = 'ColorButtonsPanel'

    var blackButton = createColorButton(0, 0, 0)
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()

    var redButton = createColorButton(4, 100, 47)
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = createColorButton(115, 87, 50)
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = createColorButton(232, 100, 50)
    blueButton.addClass(classPrefix + '-blueButton')

    var greyButton = createColorButton(0, 0, 53)
    greyButton.addClass(classPrefix + '-greyButton')

    var brownButton = createColorButton(30, 100, 33)
    brownButton.addClass(classPrefix + '-brownButton')

    var darkGreenButton = createColorButton(114, 100, 33)
    darkGreenButton.addClass(classPrefix + '-darkGreenButton')

    var skyBlueButton = createColorButton(210, 100, 80)
    skyBlueButton.addClass(classPrefix + '-skyBlueButton')

    var yellowButton = createColorButton(60, 100, 50)
    yellowButton.addClass(classPrefix + '-yellowButton')

    var orangeButton = createColorButton(32, 100, 50)
    orangeButton.addClass(classPrefix + '-orangeButton')

    var violetButton = createColorButton(306, 100, 33)
    violetButton.addClass(classPrefix + '-violetButton')

    var pinkButton = createColorButton(312, 100, 83)
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
        setColor: function (hue, saturation, luminance) {
            activeItem.setColor(hue, saturation, luminance)
        },
    }

}
