function ParamsPanel (changeListener, closeListener) {

    var classPrefix = 'ParamsPanel'

    var minBrushSize = 1,
        maxBrushSize = 15,
        initialRatio = (4 - minBrushSize) / (maxBrushSize - minBrushSize)

    var slider = Slider(initialRatio, function (ratio) {
        var brushSize = minBrushSize + ratio * maxBrushSize
        changeListener(brushSize)
    }, closeListener)

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(slider.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return {
        element: element,
        hide: function () {
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
    }

}
