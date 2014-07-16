function SaturationSlider (changeListener, endListener) {

    function updateBar () {
        var color = 'hsl(' + hue + ', 100%, ' + luminance + '%)'
        var grey = 'hsl(' + hue + ', 0%, ' + luminance + '%)'
        var shadowStops = 'rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)'
        portraitBarElement.style.backgroundImage =
            'linear-gradient(' + shadowStops + '), ' +
            'linear-gradient(90deg, ' + grey + ', ' + color + ')'
        landscapeBarElement.style.backgroundImage =
            'linear-gradient(90deg, ' + shadowStops + '), ' +
            'linear-gradient(' + color + ', ' + grey + ')'
    }

    var hue = 0, luminance = 0

    var classPrefix = 'SaturationSlider'

    var portraitBarElement = Div(classPrefix + '-portraitBar')

    var landscapeBarElement = Div(classPrefix + '-landscapeBar')

    var slider = Slider(function (ratio) {
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
