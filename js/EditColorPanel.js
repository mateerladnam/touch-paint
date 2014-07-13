function EditColorPanel (updateListener) {

    function update () {
        updateListener(h, s, l)
    }

    var h = 0, s = 0, l = 0

    var classPrefix = 'EditColorPanel'

    var hueSlider = Slider(0, function (ratio) {
        h = ratio * 360
        update()
    }, update)
    hueSlider.addClass(classPrefix + '-hueSlider')

    var saturationSlider = Slider(0, function (ratio) {
        s = ratio * 100
        update()
    }, update)
    saturationSlider.addClass(classPrefix + '-saturationSlider')

    var luminanceSlider = Slider(0, function (ratio) {
        l = ratio * 100
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
            element.classList.remove('visible')
        },
        setColor: function (_h, _s, _l) {
            h = _h
            s = _s
            l = _l
            hueSlider.setRatio(h / 360)
            saturationSlider.setRatio(s / 100)
            luminanceSlider.setRatio(l / 100)
        },
        show: function () {
            element.classList.add('visible')
        },
    }

}
