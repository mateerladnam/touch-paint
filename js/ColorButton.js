function ColorButton (color, clickListener) {

    var classPrefix = 'ColorButton'

    var colorElement = Div(classPrefix + '-color')
    colorElement.style.backgroundColor = color

    var element = Div('ColorButton')
    element.appendChild(colorElement)
    element.addEventListener('touchstart', clickListener)

    var checked = false

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        check: function () {
            element.classList.add('checked')
            checked = true
        },
        uncheck: function () {
            element.classList.remove('checked')
            checked = false
        },
    }

}
