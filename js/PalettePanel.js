function PalettePanel (colorListener) {

    var colorButtons = []

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(colorListener)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(colorButtonsPanel.element)

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
