function ColorButton (hue, saturation, luminance, alpha, clickListener) {

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

    setColor(hue, saturation, luminance, alpha)

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
