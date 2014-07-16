function PalettePanel (colorListener, closeListener) {

    function closeEdit () {
        editColorPanel.hide()
        previewButton.uncheck()
    }

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (hue, saturation, luminance, alpha) {
        previewButton.setColor(hue, saturation, luminance, alpha)
        editColorPanel.setColor(hue, saturation, luminance, alpha)
        colorListener(hue, saturation, luminance, alpha)
        if (!previewButton.isChecked()) closeListener()
    })

    var previewButton = ColorButton(0, 0, 0, 1, function () {
        if (previewButton.isChecked()) {
            closeEdit()
        } else {
            editColorPanel.show()
            previewButton.check()
        }
    })
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
