function SaturationSlider (changeListener, endListener) {

    var slider = Slider(0, changeListener, endListener)
    slider.addClass('SaturationSlider')

    return { element: slider.element }

}
