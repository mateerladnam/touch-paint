function ColorButton (hue, saturation, luminance, alpha, clickListener) {

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    function setColor (hue, saturation, luminance, alpha) {
        var hsl = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, ' + alpha + ')'
        colorElement.style.backgroundColor = hsl
    }

    var classPrefix = 'ColorButton'

    var colorElement = Div(classPrefix + '-color')

    var contentElement = Div(classPrefix + '-transparency Button-content')
    contentElement.appendChild(colorElement)
    contentElement.style.backgroundImage = 'url(images/color-background.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', click)
    element.addEventListener('touchstart', function (e) {
        e.preventDefault()
        click()
    })

    var activeTimeout
    var checked = false
    var classList = element.classList

    setColor(hue, saturation, luminance, alpha)

    return {
        element: element,
        setColor: setColor,
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
