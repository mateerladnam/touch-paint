function PickPanel (pickListener, closeListener) {

    var classPrefix = 'PickPanel'

    var colorButton = ColorButton(function () {
        var color = colorButton.color
        pickListener(color.hue, color.saturation, color.luminance)
        closeListener()
    })
    colorButton.addClass(classPrefix + '-colorButton')

    var cancelButton = BarButton('cancel', closeListener)
    cancelButton.addClass(classPrefix + '-cancelButton')

    var element = Div(classPrefix)
    element.appendChild(colorButton.element)
    element.appendChild(cancelButton.element)

    return {
        element: element,
        setColor: colorButton.setColor,
    }

}
