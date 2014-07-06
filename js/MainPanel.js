function MainPanel () {

    var classPrefix = 'MainPanel'

    var canvas = Canvas()

    var brushTool = BrushTool(canvas.canvas)
    brushTool.enable()

    var eraserTool = EraserTool(canvas.canvas)

    var brushButton = BarButton('pencil', function () {
        eraserButton.uncheck()
        brushButton.check()
        eraserTool.disable()
        brushTool.enable()
    })
    brushButton.check()

    var eraserButton = BarButton('eraser', function () {
        brushButton.uncheck()
        eraserButton.check()
        brushTool.disabled()
        eraserTool.enable()
    })

    var saveButton = BarButton('floppy', function () {

        var dataUrl = canvas.canvas.toDataURL('image/png')
        var base64Data = dataUrl.substring(22)
        var data = atob(base64Data)

        var part = new Uint8Array(data.length)
        for (var i = 0; i < data.length; i++) {
            part[i] = data.charCodeAt(i)
        }

        var blob = new Blob([part.buffer], { type: 'image/png' })
        var href = URL.createObjectURL(blob)

        var a = document.createElement('a')
        a.href = href
        a.download = 'picture.png'
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)

    })

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)
    barElement.appendChild(eraserButton.element)
    barElement.appendChild(saveButton.element)

    var element = Div(classPrefix)
    element.appendChild(canvas.element)
    element.appendChild(barElement)

    return { element: element }

}
