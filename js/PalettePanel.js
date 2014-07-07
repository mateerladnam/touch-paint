function PalettePanel () {

    var element = Div('PalettePanel')

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
