function ParamsPanel (brushSize, changeListener, closeListener) {

    function updatePreview () {
        previewC.save()
        previewC.clearRect(0, 0, previewCanvas.width, previewCanvas.height)
        previewC.translate(previewCanvas.width / 2, previewCanvas.height / 2)
        previewC.beginPath()
        previewC.arc(0, 0, (brushSize + 1) / 2, 0, Math.PI * 2)
        previewC.fill()
        previewC.restore()
    }

    var classPrefix = 'ParamsPanel'

    var minBrushSize = 1,
        maxBrushSize = 48,
        initialRatio = (brushSize - minBrushSize) / (maxBrushSize - minBrushSize)

    var previewCanvas = document.createElement('canvas')
    previewCanvas.width = previewCanvas.height = maxBrushSize + 4
    previewCanvas.className = classPrefix + '-previewCanvas'

    var previewC = previewCanvas.getContext('2d')

    var slider = Slider(initialRatio, function (ratio) {
        brushSize = minBrushSize + ratio * maxBrushSize
        changeListener(brushSize)
        updatePreview()
    }, closeListener)
    slider.addClass(classPrefix + '-slider')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(slider.element)
    contentElement.appendChild(previewCanvas)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    updatePreview()

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
