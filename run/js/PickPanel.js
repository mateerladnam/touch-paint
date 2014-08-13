function PickPanel (pickListener) {

    var colorButton = ColorButton(pickListener)

    var element = Div('PickPanel')
    element.appendChild(colorButton.element)

    return {
        element: element,
    }

}
