function PalettePanel (colorListener) {

    var classPrefix = 'PalettePanel'

    var blackButton = ColorButton('#000', function () {

        redButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        greyButton.uncheck()
        brownButton.uncheck()
        darkGreenButton.uncheck()

        blackButton.check()
        colorListener('#000')

    })
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()

    var redButton = ColorButton('#f00', function () {

        blackButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        greyButton.uncheck()
        brownButton.uncheck()
        darkGreenButton.uncheck()

        redButton.check()
        colorListener('#f00')

    })
    redButton.addClass(classPrefix + '-redButton')

    var greenButton = ColorButton('#0f0', function () {

        blackButton.uncheck()
        redButton.uncheck()
        blueButton.uncheck()
        greyButton.uncheck()
        brownButton.uncheck()
        darkGreenButton.uncheck()

        greenButton.check()
        colorListener('#0f0')

    })
    greenButton.addClass(classPrefix + '-greenButton')

    var blueButton = ColorButton('#00f', function () {

        blackButton.uncheck()
        redButton.uncheck()
        greenButton.uncheck()
        greyButton.uncheck()
        brownButton.uncheck()
        darkGreenButton.uncheck()

        blueButton.check()
        colorListener('#00f')

    })
    blueButton.addClass(classPrefix + '-blueButton')

    var greyButton = ColorButton('#888', function () {

        blackButton.uncheck()
        redButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        brownButton.uncheck()
        darkGreenButton.uncheck()

        greyButton.check()
        colorListener('#888')

    })
    greyButton.addClass(classPrefix + '-greyButton')

    var brownButton = ColorButton('#a50', function () {

        blackButton.uncheck()
        redButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        greyButton.uncheck()
        darkGreenButton.uncheck()

        brownButton.check()
        colorListener('#a50')

    })
    brownButton.addClass(classPrefix + '-brownButton')

    var darkGreenButton = ColorButton('#0a0', function () {

        blackButton.uncheck()
        redButton.uncheck()
        greenButton.uncheck()
        blueButton.uncheck()
        greyButton.uncheck()
        brownButton.uncheck()

        darkGreenButton.check()
        colorListener('#0a0')

    })
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
