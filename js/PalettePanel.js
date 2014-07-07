function PalettePanel (colorListener) {

    var classPrefix = 'PalettePanel'

    var blackButton = ColorButton('#000', function () {
        redButton.uncheck()
        blackButton.check()
        colorListener('#000')
    })
    blackButton.addClass(classPrefix + '-blackButton')
    blackButton.check()

    var redButton = ColorButton('#f00', function () {
        blackButton.uncheck()
        redButton.check()
        colorListener('#f00')
    })
    redButton.addClass(classPrefix + '-redButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(blackButton.element)
    contentElement.appendChild(redButton.element)

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
