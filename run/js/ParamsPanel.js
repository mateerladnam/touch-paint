function ParamsPanel (brushSize, changeListener, closeListener) {

    var classPrefix = 'ParamsPanel'

    var minBrushSize = 1,
        maxBrushSize = 24,
        initialRatio = (brushSize - minBrushSize) / (maxBrushSize - minBrushSize)

    var slider = Slider(initialRatio, function (ratio) {
        changeListener(minBrushSize + ratio * maxBrushSize)
    }, closeListener)
    slider.addClass(classPrefix + '-slider')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(slider.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return {
        element: element,
        hide: function () {
            slider.abortTouch()
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
    }

}
