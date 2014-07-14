function LuminanceSlider (changeListener, endListener) {

    function updateBar () {
        var blackColor = 'hsl(' + hue + ', ' + saturation + '%, 0%)'
        var saturatedColor = 'hsl(' + hue + ', ' + saturation + '%, 50%)'
        var whiteColor = 'hsl(' + hue + ', ' + saturation + '%, 100%)'
        portraitBarElement.style.backgroundImage = 'linear-gradient(90deg, ' + blackColor + ', ' + saturatedColor + ', ' + whiteColor + ')'
        landscapeBarElement.style.backgroundImage = 'linear-gradient(' + whiteColor + ', ' + saturatedColor + ', ' + blackColor + ')'
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
