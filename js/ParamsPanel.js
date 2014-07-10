function ParamsPanel (changeListener, closeListener) {

    var classPrefix = 'ParamsPanel'

    var slider = Slider(function (ratio) {
        var brushSize = 1 + ratio * 15
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
