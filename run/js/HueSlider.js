function HueSlider (changeListener, endListener) {

    var slider = Slider(function (ratio) {
        changeListener(ratio * 360)
    }, endListener)
    slider.addClass('HueSlider')

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
        setHue: function (hue) {
            slider.setRatio(hue / 360)
        },
    }

}
