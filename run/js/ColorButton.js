function ColorButton (clickListener) {

    function click () {
        clickListener()
        classList.add('active')
        clearTimeout(activeTimeout)
        activeTimeout = setTimeout(function () {
            classList.remove('active')
        }, 100)
    }

    var touched = false

    var classPrefix = 'ColorButton'

    var opaqueElement = Div(classPrefix + '-opaque')

    var colorElement = Div(classPrefix + '-color')
    colorElement.appendChild(opaqueElement)

    var contentElement = Div(classPrefix + '-transparency Button-content')
    contentElement.appendChild(colorElement)
    contentElement.style.backgroundImage = 'url(images/color-background.svg)'

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

    var buttonExpandable = ButtonExpandable(element)

    var activeTimeout
    var checked = false
    var classList = element.classList

    var color = {}

    return {
        color: color,
        element: element,
        hideExpandable: buttonExpandable.hide,
        showExpandable: buttonExpandable.show,
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
        mark: function () {
            classList.add('marked')
        },
        setColor: function (hue, saturation, luminance, alpha) {

            color.hue = hue
            color.saturation = saturation
            color.luminance = luminance
            color.alpha = alpha

            var hslPart = hue + ', ' + saturation + '%, ' + luminance + '%'

            var hsla = 'hsla(' + hslPart + ', ' + alpha + ')'
            colorElement.style.backgroundColor = hsla

            var hsl = 'hsl(' + hslPart + ')'
            opaqueElement.style.backgroundColor = hsl

        },
        uncheck: function () {
            classList.remove('checked')
            checked = false
        },
        unmark: function () {
            classList.remove('marked')
        },
    }

}
