function PickPanel (pickListener, cancelListener) {

    var classPrefix = 'PickPanel'

    var colorButton = ColorButton(pickListener, cancelListener)
    colorButton.addClass(classPrefix + '-colorButton')

    var cancelButton = BarButton('cancel', cancelListener)
    cancelButton.addClass(classPrefix + '-cancelButton')

    var element = Div(classPrefix)
    element.appendChild(colorButton.element)
    element.appendChild(cancelButton.element)

    var setColor = colorButton.setColor

    return {
        element: element,
        setColor: setColor,
        setButton: function (button) {
            var color = button.color
            setColor(color.hue, color.saturation, color.luminance, 1)
        },
    }

}
