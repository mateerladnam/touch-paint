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
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
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
