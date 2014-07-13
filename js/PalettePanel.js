function PalettePanel (colorListener) {

    var colorButtons = []

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (color) {
        previewButton.setColor(color)
        colorListener(color)
    })

    var previewButton = ColorButton('#000', function () {
    })
    previewButton.addClass(classPrefix + '-previewButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(colorButtonsPanel.element)
    contentElement.appendChild(previewButton.element)

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
