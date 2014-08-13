function ToolButton (icon, clickListener) {

    var barButton = BarButton(icon, clickListener)

    var classPrefix = 'ToolButton'

    var opaqueElement = Div(classPrefix + '-opaque')

    var colorElement = Div(classPrefix + '-color')
    colorElement.appendChild(opaqueElement)

    var transparencyElement = Div(classPrefix + '-transparency')
    transparencyElement.style.backgroundImage = 'url(images/color-background.svg)'
    transparencyElement.appendChild(colorElement)

    var element = barButton.element

    var classList = element.classList

    barButton.contentElement.appendChild(transparencyElement)

    return {
        addClass: barButton.addClass,
        check: barButton.check,
        element: element,
        isChecked: barButton.isChecked,
        uncheck: barButton.uncheck,
        mark: function () {
            classList.add('marked')
        },
        setColor: function (hue, saturation, luminance, alpha) {

            var hslPart = hue + ', ' + saturation + '%, ' + luminance + '%'

            var hsla = 'hsla(' + hslPart + ', ' + alpha + ')'
            colorElement.style.background = hsla

            var hsl = 'hsl(' + hslPart + ')'
            opaqueElement.style.background = hsl

        },
        unmark: function () {
            classList.remove('marked')
        },
    }

}
