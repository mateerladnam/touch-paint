function BarButton (icon, clickListener) {

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    })

    var activeTimeout
    var checked = false
    var classList = element.classList

    return {
        element: element,
        addClass: function (className) {
            classList.add(className)
        },
        check: function () {
            classList.add('checked')
            checked = true
        },
        isChecked: function () {
            return checked
        },
        uncheck: function () {
            classList.remove('checked')
            checked = false
        },
    }

}
