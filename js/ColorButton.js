function ColorButton (h, s, l, clickListener) {

    function setColor (h, s, l) {
        contentElement.style.backgroundColor = 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
    }

    var contentElement = Div('Button-content')

    var element = Div('Button')
    element.appendChild(contentElement)
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

    setColor(h, s, l)

    return {
        element: element,
        setColor: setColor,
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
