function PickTool (canvas, pickListener) {

    function mouseDown (e) {

        function mouseMove (e) {
            e.preventDefault()
            if (touched) touched = false
            else pick(e)
        }

        function mouseUp (e) {
            e.preventDefault()
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
        }

        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else {
            pick(e)
            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)
        }
    }

    function pick (e) {
        var rect = canvasElement.getBoundingClientRect(),
            x = Math.floor(e.clientX - rect.left),
            y = Math.floor(e.clientY - rect.top),
            data = imageData.data,
            offset = (x + y * canvasWidth) * 4,
            hsl = rgb2hsl(data[offset], data[offset + 1], data[offset + 2])
        pickListener(hsl.hue, hsl.saturation, hsl.luminance)
    }

    function touchEnd (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                break
            }
        }
    }

    function touchMove (e) {
        e.preventDefault()
        touched = true
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                pick(touch)
                break
            }
        }
    }

    function touchStart (e) {
        e.preventDefault()
        touched = true
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        pick(touch)
    }

    var imageData,
        touched = false,
        identifier = null,
        enabled = false,
        canvasElement = canvas.canvas,
        canvasWidth = canvasElement.width,
        c = canvasElement.getContext('2d')

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            canvasElement.removeEventListener('touchend', touchEnd)
            canvasElement.removeEventListener('touchmove', touchMove)
            canvasElement.removeEventListener('touchstart', touchStart)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            canvasElement.addEventListener('touchend', touchEnd)
            canvasElement.addEventListener('touchmove', touchMove)
            canvasElement.addEventListener('touchstart', touchStart)
            enabled = true
            imageData = c.getImageData(0, 0, canvasWidth, canvasElement.height)
        },
    }

}
