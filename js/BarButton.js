function BarButton (icon, clickListener) {

    var classPrefix = 'BarButton'

    var iconElement = Div(classPrefix + '-icon')
    iconElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('BarButton')
    element.appendChild(iconElement)
    element.addEventListener('touchstart', clickListener)

    var checked = false

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
        isChecked: function () {
            return checked
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
