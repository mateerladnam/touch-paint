function BarButton (icon, clickListener) {

    var classPrefix = 'BarButton'

    var iconElement = Div(classPrefix + '-icon')
    iconElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('BarButton')
    element.appendChild(iconElement)
    element.addEventListener('touchstart', clickListener)

    return {
        element: element,
        check: function () {
            element.classList.add('checked')
        },
        uncheck: function () {
            element.classList.remove('checked')
        },
    }

}
