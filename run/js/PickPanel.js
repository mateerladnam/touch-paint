function PickPanel (pickListener) {

    var colorButton = ColorButton(pickListener)

    var element = Div('PickPanel')

    return {
        element: element,
    }

}
