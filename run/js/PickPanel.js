function PickPanel (pickListener, cancelListener) {

    var classPrefix = 'PickPanel'

    var colorButton = ColorButton(pickListener, cancelListener)
    colorButton.addClass(classPrefix + '-colorButton')

    var cancelButton = BarButton('cancel', cancelListener)
    cancelButton.addClass(classPrefix + '-cancelButton')

    var element = Div(classPrefix)
    element.appendChild(colorButton.element)
    element.appendChild(cancelButton.element)

    return {
        element: element,
    }

}
