function EditColorPanel (updateListener) {

    function update () {
        updateListener(hue, saturation, luminance)
    }

    var hue = 0, saturation = 0, luminance = 0

    var classPrefix = 'EditColorPanel'

    var hueSlider = Slider(0, function (ratio) {
        hue = ratio * 360
        update()
    }, update)
    hueSlider.addClass(classPrefix + '-hueSlider')

    var saturationSlider = Slider(0, function (ratio) {
        saturation = ratio * 100
        update()
    }, update)
    saturationSlider.addClass(classPrefix + '-saturationSlider')

    var luminanceSlider = Slider(0, function (ratio) {
        luminance = ratio * 100
        update()
    }, update)
    luminanceSlider.addClass(classPrefix + '-luminanceSlider')

    var element = Div(classPrefix)
    element.appendChild(hueSlider.element)
    element.appendChild(saturationSlider.element)
    element.appendChild(luminanceSlider.element)

    return {
        element: element,
        hide: function () {
            hueSlider.abortTouch()
            saturationSlider.abortTouch()
            luminanceSlider.abortTouch()
            element.classList.remove('visible')
        },
        setColor: function (_hue, _saturation, _luminance) {
            hue = _hue
            saturation = _saturation
            luminance = _luminance
            hueSlider.setRatio(hue / 360)
            saturationSlider.setRatio(saturation / 100)
            luminanceSlider.setRatio(luminance / 100)
        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
