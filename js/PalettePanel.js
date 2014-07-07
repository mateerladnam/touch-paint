function PalettePanel (colorListener) {

    var classPrefix = 'PalettePanel'

    var blackButton = ColorButton('#000', function () {
        redButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        blackButton.check()
        colorListener('#000')
    })
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()

    var redButton = ColorButton('#f00', function () {
        blackButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        redButton.check()
        colorListener('#f00')
    })
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = ColorButton('#0f0', function () {
        blackButton.uncheck()
        blueButton.uncheck()
        greenButton.check()
        colorListener('#0f0')
    })
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = ColorButton('#00f', function () {
        blackButton.uncheck()
        redButton.uncheck()
        greenButton.uncheck()
        blueButton.check()
        colorListener('#00f')
    })
    blueButton.addClass(classPrefix + '-blueButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(blackButton.element)
    contentElement.appendChild(redButton.element)
    contentElement.appendChild(greenButton.element)
    contentElement.appendChild(blueButton.element)

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
