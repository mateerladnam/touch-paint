function ParamsPanel (size, changeListener, closeListener) {

    function updatePreview () {
        previewC.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
        previewC.beginPath()
        previewC.arc(previewCanvas.width / 2, previewCanvas.height / 2, (size + 1) / 2, 0, Math.PI * 2)
        previewC.fill()
    }

    var classPrefix = 'ParamsPanel'

    var minSize = 1, maxSize = 48

    var previewCanvas = document.createElement('canvas')
    previewCanvas.width = previewCanvas.height = maxSize + 4
    previewCanvas.className = classPrefix + '-previewCanvas'

    var previewC = previewCanvas.getContext('2d')

    var slider = Slider(function (ratio) {
        size = minSize + ratio * maxSize
        changeListener(size)
        updatePreview()
    }, closeListener)
    slider.setRatio((size - minSize) / (maxSize - minSize))
    slider.addClass(classPrefix + '-slider')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(slider.element)
    contentElement.appendChild(previewCanvas)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    updatePreview()

    var previewChanged = false

    return {
        element: element,
        hide: function () {
            slider.abortTouch()
            contentElement.classList.remove('visible')
        },
        setColor: function (hue, saturation, luminance) {
            previewC.fillStyle = 'hsl(' + hue + ', ' + saturation + '%, ' + luminance + '%)'
            previewChanged = true
        },
        setSize: function (_size) {
            size = _size
            previewChanged = true
        },
        show: function () {
            if (previewChanged) {
                updatePreview()
                previewChanged = false
                slider.setRatio((size - minSize) / (maxSize - minSize))            
            }
            contentElement.classList.add('visible')
        },
    }

}
