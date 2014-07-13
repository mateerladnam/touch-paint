function PalettePanel (colorListener) {

    function closeEdit () {
        editColorPanel.hide()
        previewButton.uncheck()
    }

    var colorButtons = []

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (color) {
        previewButton.setColor(color)
        colorListener(color)
    })

    var previewButton = ColorButton('#000', function () {
        if (previewButton.isChecked()) {
            closeEdit()
        } else {
            editColorPanel.show()
            previewButton.check()
        }
    })
    previewButton.addClass(classPrefix + '-previewButton')

    var editColorPanel = EditColorPanel()

    var secondLayerElement = Div(classPrefix + '-secondLayer')
    secondLayerElement.appendChild(colorButtonsPanel.element)
    secondLayerElement.appendChild(previewButton.element)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(editColorPanel.element)
    contentElement.appendChild(secondLayerElement)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return {
        element: element,
        hide: function () {
            closeEdit()
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
    }

}
