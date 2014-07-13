function EditColorPanel () {

    var classPrefix = 'EditColorPanel'

    var hueSlider = Slider(0, function () {
    }, function () {
    })
    hueSlider.addClass(classPrefix + '-hueSlider')

    var saturationSlider = Slider(0, function () {
    }, function () {
    })
    saturationSlider.addClass(classPrefix + '-saturationSlider')

    var luminanceSlider = Slider(0, function () {
    }, function () {
    })
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
        show: function () {
            element.classList.add('visible')
        },
    }

}
