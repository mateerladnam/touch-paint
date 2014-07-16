function AlphaSlider (changeListener, endListener) {

    var hue = 0, saturation = 0, luminance = 0

    var slider = Slider(1, changeListener, endListener)
    slider.addClass('AlphaSlider')

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setAlpha: slider.setRatio,
        setHue: function (_hue) {
            hue = _hue
        },
        setLuminance: function (_luminance) {
            luminance = _luminance
        },
        setSaturation: function (_saturation) {
            saturation = _saturation
        },
    }

}
