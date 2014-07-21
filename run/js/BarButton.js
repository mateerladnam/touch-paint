function BarButton (icon, clickListener) {

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    var touched = false

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', function (e) {
        if (touched) {
            touched = false
            return
        }
        click()
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        e.preventDefault()
        click()
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
