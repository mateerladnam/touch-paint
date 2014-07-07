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

    var element = Div(classPrefix)
    element.appendChild(blackButton.element)
    element.appendChild(redButton.element)

    return {
        element: element,
        hide: function () {
            element.classList.remove('visible')
        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
