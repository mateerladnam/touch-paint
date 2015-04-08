function BarButton (icon, clickListener) {

    function addListeners () {
        element.addEventListener('mousedown', mouseDown)
        element.addEventListener('touchstart', touchStart)
    }

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    function mouseDown (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else click()
    }

    function setIcon (icon) {
        contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'
    }

    function touchStart (e) {
        touched = true
        e.preventDefault()
        click()
    }

    var touched = false

    var contentElement = Div('Button-content')

    var element = Div('Button')
    element.appendChild(contentElement)

    var activeTimeout
    var checked = false
    var classList = element.classList

    setIcon(icon)
    addListeners()

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
        disable: function () {
            classList.add('disabled')
            element.removeEventListener('mousedown', mouseDown)
            element.removeEventListener('touchstart', touchStart)
        },
        enable: function () {
            classList.remove('disabled')
            addListeners()
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
