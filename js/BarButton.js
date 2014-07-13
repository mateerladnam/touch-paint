function BarButton (icon, clickListener) {

    var iconElement = Div('Button-content')
    iconElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(iconElement)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        clickListener()
        element.classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            element.classList.remove('active')
        }, 100)
    })

    var activeTimeout
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
        isChecked: function () {
            return checked
        },
        uncheck: function () {
            element.classList.remove('checked')
            checked = false
        },
    }

}
