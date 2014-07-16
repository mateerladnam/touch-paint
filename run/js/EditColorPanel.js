function EditColorPanel (updateListener) {

    function update () {
        updateListener(hue, saturation, luminance)
    }

    var hue = 0, saturation = 0, luminance = 0

    var classPrefix = 'EditColorPanel'

    var hueSlider = HueSlider(function (_hue) {
        hue = _hue
        update()
        saturationSlider.setHue(hue)
        luminanceSlider.setHue(hue)
    }, update)

    var saturationSlider = SaturationSlider(function (_saturation) {
        saturation = _saturation
        update()
        luminanceSlider.setSaturation(saturation)
    }, update)

    var luminanceSlider = LuminanceSlider(function (_luminance) {
        luminance = _luminance
        update()
        saturationSlider.setLuminance(luminance)
    }, update)

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

            hueSlider.setHue(hue)

            saturationSlider.setHue(hue)
            saturationSlider.setSaturation(saturation)
            saturationSlider.setLuminance(luminance)

            luminanceSlider.setHue(hue)
            luminanceSlider.setSaturation(saturation)
            luminanceSlider.setLuminance(luminance)

        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
