function PalettePanel (colorListener, closeListener, buttonListener) {

    function selectColor (color) {
        var hue = color.hue,
            saturation = color.saturation,
            luminance = color.luminance,
            alpha = color.alpha
        previewButton.setColor(hue, saturation, luminance, alpha)
        editColorPanel.setColor(hue, saturation, luminance, alpha)
    }

    var classPrefix = 'PalettePanel'

    var colorButtonsPanel = ColorButtonsPanel(function (button) {
        var color = button.color
        selectColor(color)
        colorListener(color.hue, color.saturation, color.luminance, color.alpha)
        buttonListener(button)
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
        whiteButton: colorButtonsPanel.whiteButton,
        hide: function () {
            editColorPanel.hide()
            contentElement.classList.remove('visible')
        },
        select: function (button) {
            colorButtonsPanel.select(button)
            selectColor(button.color)
        },
        show: function () {
            if (editVisible) editColorPanel.show()
            contentElement.classList.add('visible')
        },
    }

}
