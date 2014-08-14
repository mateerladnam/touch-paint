function PalettePanel (colorListener, closeListener, buttonListener, pickListener) {

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
        activeButton = button
        buttonListener(button)
        var color = button.color
        selectColor(color)
        colorListener(color.hue, color.saturation, color.luminance, color.alpha, button)
        if (!previewButton.isChecked()) closeListener()
    })

    var previewButton = ColorButton(function () {
        if (!visible) return
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
        colorListener(hue, saturation, luminance, alpha, activeButton)
    })

    var pickButton = PickButton(function () {
        pickListener(activeButton)
    })

    var secondLayerElement = Div(classPrefix + '-secondLayer')
    secondLayerElement.appendChild(colorButtonsPanel.element)
    secondLayerElement.appendChild(previewButton.element)
    secondLayerElement.appendChild(pickButton.element)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(editColorPanel.element)
    contentElement.appendChild(secondLayerElement)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var visible = false,
        editVisible = false

    var activeButton = colorButtonsPanel.blackButton

    return {
        blackButton: colorButtonsPanel.blackButton,
        element: element,
        whiteButton: colorButtonsPanel.whiteButton,
        getActiveButton: function () {
            return activeButton
        },
        hide: function () {
            if (visible) {
                editColorPanel.hide()
                contentElement.classList.remove('visible')
                visible = false
            }
        },
        select: function (button) {
            activeButton = button
            colorButtonsPanel.select(button)
            selectColor(button.color)
        },
        pickColor: function (hue, saturation, luminance) {
            var alpha = previewButton.color.alpha
            previewButton.setColor(hue, saturation, luminance, alpha)
            colorButtonsPanel.setColor(hue, saturation, luminance, alpha)
        },
        show: function () {
            if (!visible) {
                if (editVisible) editColorPanel.show()
                contentElement.classList.add('visible')
                visible = true
            }
        },
    }

}
