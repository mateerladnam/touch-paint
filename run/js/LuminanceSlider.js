function LuminanceSlider (changeListener, endListener) {

    function updateBar () {
        var black = 'hsl(' + hue + ', ' + saturation + '%, 0%)'
        var color = 'hsl(' + hue + ', ' + saturation + '%, 50%)'
        var white = 'hsl(' + hue + ', ' + saturation + '%, 100%)'
        var shadowStops = 'rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)'
        portraitBarElement.style.backgroundImage =
            'linear-gradient(' + shadowStops + '), ' +
            'linear-gradient(90deg, ' + black + ', ' + color + ', ' + white + ')'
        landscapeBarElement.style.backgroundImage =
            'linear-gradient(90deg, ' + shadowStops + '), ' +
            'linear-gradient(' + white + ', ' + color + ', ' + black + ')'
    }

    var hue = 0, saturation = 0

    var classPrefix = 'LuminanceSlider'

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
        setLuminance: function (luminance) {
            slider.setRatio(luminance / 100)
        },
        setSaturation: function (_saturation) {
            saturation = _saturation
            updateBar()
        },
    }

}
