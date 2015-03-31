function BarButton (icon, clickListener) {

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    function setIcon (icon) {
        contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'
    }

    var touched = false

    var contentElement = Div('Button-content')

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        e.preventDefault()
        click()
    })

    var activeTimeout
    var checked = false
    var classList = element.classList

    setIcon(icon)

    return {
        contentElement: contentElement,
        element: element,
        setIcon: setIcon,
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
