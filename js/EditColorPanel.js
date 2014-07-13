function EditColorPanel () {

    var classPrefix = 'EditColorPanel'

    var element = Div(classPrefix)

    return {
        element: element,
        hide: function () {
            element.classList.remove('visible')
        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
