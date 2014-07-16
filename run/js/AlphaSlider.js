function AlphaSlider (changeListener, endListener) {

    var slider = Slider(1, changeListener, endListener)
    slider.addClass('AlphaSlider')

    return {
        abortTouch: slider.abortTouch,
        element: slider.element,
    }

}
