function Canvas () {

    var classPrefix = 'Canvas'

    var size = Math.max(screen.width, screen.height)

    var canvas = document.createElement('canvas')
    canvas.className = classPrefix + '-canvas'
    canvas.width = canvas.height = size
    canvas.style.left = canvas.style.top = -size / 2 + 'px'

    var c = canvas.getContext('2d')
    c.lineCap = 'round'
    c.fillStyle = '#fff'
    c.fillRect(0, 0, size, size)

    var centerElement = Div(classPrefix + '-center')
    centerElement.appendChild(canvas)

    var element = Div(classPrefix)
    element.appendChild(centerElement)

    var initialCanvas = document.createElement('canvas')
    initialCanvas.width = initialCanvas.height = size

    var initialC = initialCanvas.getContext('2d')
    initialC.lineCap = 'round'
    initialC.fillStyle = '#fff'
    initialC.fillRect(0, 0, size, size)

    var operations = []

    var undoAvailableListener
    var undoUnavailableListener

    var undoSize = 128
    var undoCanvases = []

    return {
        canvas: canvas,
        element: element,
        onUndoAvailable: function (listener) {
            undoAvailableListener = listener
        },
        onUndoUnavailable: function (listener) {
            undoUnavailableListener = listener
        },
        operate: function (operation, timeout) {

            operations.push({
                operation: operation,
                timeout: timeout,
            })
            if (operations.length == 1) undoAvailableListener()
            operation(c)

            var operationIndex = operations.length - undoSize
            if (operationIndex < 0) return

            var canvasIndex = Math.floor(operationIndex / undoSize)

            if (undoCanvases[canvasIndex]) return

            var undoCanvas = document.createElement('canvas')
            undoCanvas.width = undoCanvas.height = size

            var undoC = undoCanvas.getContext('2d')
            undoC.lineCap = 'round'

            if (canvasIndex) {
                undoC.drawImage(undoCanvases[canvasIndex - 1], 0, 0)
            } else {
                undoC.drawImage(initialCanvas, 0, 0)
            }

            undoCanvases.push(undoCanvas)

            for (var i = operationIndex; i < operationIndex + undoSize; i++) {
                operations[i].operation(undoC)
            }

            if (undoCanvases.length > 16) {
                initialC.drawImage(undoCanvases.shift(), 0, 0)
                operations.splice(0, undoSize)
            }

        },
        undo: function () {

            c.globalAlpha = 1
            if (undoCanvases.length) {
                c.drawImage(undoCanvases[undoCanvases.length - 1], 0, 0)
            } else {
                c.drawImage(initialCanvas, 0, 0)
            }

            if (!operations.length) return 50

            var lastOperation = operations.pop()

            var startIndex = undoCanvases.length * undoSize
            for (var i = startIndex; i < operations.length; i++) {
                operations[i].operation(c)
            }

            if (undoCanvases.length * undoSize > operations.length) {
                undoCanvases.pop()
            }

            if (!operations.length) undoUnavailableListener()

            return lastOperation.timeout

        },
    }

}
