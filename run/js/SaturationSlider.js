function SaturationSlider (changeListener, endListener) {

    function updateBar () {
        var saturatedColor = 'hsl(' + hue + ', 100%, ' + luminance + '%)'
        var desaturatedColor = 'hsl(' + hue + ', 0%, ' + luminance + '%)'
        portraitBarElement.style.backgroundImage = 'linear-gradient(90deg, ' + desaturatedColor + ', ' + saturatedColor + ')'
        landscapeBarElement.style.backgroundImage = 'linear-gradient(' + saturatedColor + ', ' + desaturatedColor + ')'
    }

    var hue = 0, luminance = 0

    var classPrefix = 'SaturationSlider'

    var portraitBarElement = Div(classPrefix + '-portraitBar')

    var landscapeBarElement = Div(classPrefix + '-landscapeBar')

    var slider = Slider(0, function (ratio) {
        changeListener(ratio * 100)
    }, endListener)
    slider.addClass(classPrefix)
    slider.barElement.appendChild(portraitBarElement)
    slider.barElement.appendChild(landscapeBarElement)

    updateBar()

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setHue: function (_hue) {
            hue = _hue
            updateBar()
        },
        setLuminance: function (_luminance) {
            luminance = _luminance
            updateBar()
        },
        setSaturation: function (saturation) {
            slider.setRatio(saturation / 100)
        },
    }

}
