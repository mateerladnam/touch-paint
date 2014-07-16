function EditColorPanel (updateListener) {

    function update () {
        updateListener(hue, saturation, luminance, alpha)
    }

    var hue = 0, saturation = 0, luminance = 0, alpha = 1

    var classPrefix = 'EditColorPanel'

    var hueSlider = HueSlider(function (_hue) {
        hue = _hue
        update()
        saturationSlider.setHue(hue)
        luminanceSlider.setHue(hue)
        alphaSlider.setHue(hue)
    }, update)

    var saturationSlider = SaturationSlider(function (_saturation) {
        saturation = _saturation
        update()
        luminanceSlider.setSaturation(saturation)
        alphaSlider.setSaturation(saturation)
    }, update)

    var luminanceSlider = LuminanceSlider(function (_luminance) {
        luminance = _luminance
        update()
        saturationSlider.setLuminance(luminance)
        alphaSlider.setLuminance(luminance)
    }, update)

    var alphaSlider = AlphaSlider(function (_alpha) {
        alpha = _alpha
        update()
    }, update)

    var element = Div(classPrefix)
    element.appendChild(hueSlider.element)
    element.appendChild(saturationSlider.element)
    element.appendChild(luminanceSlider.element)
    element.appendChild(alphaSlider.element)

    return {
        element: element,
        hide: function () {
            hueSlider.abortTouch()
            saturationSlider.abortTouch()
            luminanceSlider.abortTouch()
            alphaSlider.abortTouch()
            element.classList.remove('visible')
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {

            hue = _hue
            saturation = _saturation
            luminance = _luminance
            alpha = _alpha

            hueSlider.setHue(hue)

            saturationSlider.setHue(hue)
            saturationSlider.setSaturation(saturation)
            saturationSlider.setLuminance(luminance)

            luminanceSlider.setHue(hue)
            luminanceSlider.setSaturation(saturation)
            luminanceSlider.setLuminance(luminance)

            alphaSlider.setHue(hue)
            alphaSlider.setSaturation(saturation)
            alphaSlider.setLuminance(luminance)
            alphaSlider.setAlpha(alpha)

        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
