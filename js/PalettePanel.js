function PalettePanel (colorListener) {

    function closeEdit () {
        editColorPanel.hide()
        previewButton.uncheck()
    }

    var colorButtons = []

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (h, s, l) {
        previewButton.setColor(h, s, l)
        editColorPanel.setColor(h, s, l)
        colorListener(h, s, l)
    })

    var previewButton = ColorButton(0, 0, 0, function () {
        if (previewButton.isChecked()) {
            closeEdit()
        } else {
            editColorPanel.show()
            previewButton.check()
        }
    })
    previewButton.addClass(classPrefix + '-previewButton')

    var editColorPanel = EditColorPanel(function (h, s, l) {
        previewButton.setColor(h, s, l)
        colorButtonsPanel.setColor(h, s, l)
    })

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
