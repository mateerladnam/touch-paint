function PalettePanel (colorListener, closeListener) {

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (hue, saturation, luminance, alpha) {
        previewButton.setColor(hue, saturation, luminance, alpha)
        editColorPanel.setColor(hue, saturation, luminance, alpha)
        colorListener(hue, saturation, luminance, alpha)
        if (!previewButton.isChecked()) closeListener()
    })

    var previewButton = ColorButton(function () {
        if (previewButton.isChecked()) {
            editColorPanel.hide()
            previewButton.uncheck()
            editVisible = false
        } else {
            editColorPanel.show()
            previewButton.check()
            editVisible = true
        }
    })
    previewButton.setColor(0, 0, 0, 1)
    previewButton.addClass(classPrefix + '-previewButton')

    var editColorPanel = EditColorPanel(function (hue, saturation, luminance, alpha) {
        previewButton.setColor(hue, saturation, luminance, alpha)
        colorButtonsPanel.setColor(hue, saturation, luminance, alpha)
        colorListener(hue, saturation, luminance, alpha)
    })

    var secondLayerElement = Div(classPrefix + '-secondLayer')
    secondLayerElement.appendChild(colorButtonsPanel.element)
    secondLayerElement.appendChild(previewButton.element)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(editColorPanel.element)
    contentElement.appendChild(secondLayerElement)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var editVisible = false

    return {
        blackButton: colorButtonsPanel.blackButton,
        element: element,
        selectButton: colorButtonsPanel.selectButton,
        whiteButton: colorButtonsPanel.whiteButton,
        hide: function () {
            editColorPanel.hide()
            contentElement.classList.remove('visible')
        },
        show: function () {
            if (editVisible) editColorPanel.show()
            contentElement.classList.add('visible')
        },
    }

}
