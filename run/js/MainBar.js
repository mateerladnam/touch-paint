function MainBar () {

    var element = Div('MainBar')

    return {
        element: element,
        addButton: function (button) {
            element.appendChild(button.element)
        },
    }

}
