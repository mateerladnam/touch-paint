function AlphaSlider (changeListener, endListener) {

    function update () {
        var color = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)'
        var transparent = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, 0)'
        var grid = 'url(images/color-background.svg)'
        var shadowStops = 'rgba(0, 0, 0, 0.1), rgba(255, 255, 255, 0.1)'
        portraitBarElement.style.backgroundImage =
            'linear-gradient(' + shadowStops + '), ' +
            'linear-gradient(90deg, ' + transparent + ', ' + color + '), ' + grid
        landscapeBarElement.style.backgroundImage =
            'linear-gradient(90deg, ' + shadowStops + '), ' +
            'linear-gradient(' + color + ', ' + transparent + '), ' + grid
    }

    var classPrefix = 'AlphaSlider'

    var portraitBarElement = Div(classPrefix + '-portraitBar')

    var landscapeBarElement = Div(classPrefix + '-landscapeBar')

    var hue = 0, saturation = 0, luminance = 0

    var slider = Slider(function (ratio) {
        changeListener(ratio)
        update()
    }, endListener)
    slider.setRatio(1)
    slider.addClass(classPrefix)
    slider.barElement.appendChild(portraitBarElement)
    slider.barElement.appendChild(landscapeBarElement)

    update()

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setAlpha: slider.setRatio,
        setHue: function (_hue) {
            hue = _hue
            update()
        },
        setLuminance: function (_luminance) {
            luminance = _luminance
            update()
        },
        setSaturation: function (_saturation) {
            saturation = _saturation
            update()
        },
    }

}
