function PickTool (canvas, pickListener) {

    function mouseDown (e) {
        e.preventDefault()
        if (touched) touched = false
        else pick(e)
    }

    function mouseMove (e) {
        e.preventDefault()
        if (touched) touched = false
        else pick(e)
    }

    function pick (e) {
        var rect = canvasElement.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top,
            imageData = c.getImageData(x, y, 1, 1),
            data = imageData.data,
            hsl = rgb2hsl(data[0], data[1], data[2])
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

    var touched = false,
        identifier = null,
        enabled = false,
        canvasElement = canvas.canvas,
        c = canvasElement.getContext('2d')

    return {
        disable: function () {
            if (enabled) {
                canvasElement.removeEventListener('mousedown', mouseDown)
                canvasElement.removeEventListener('mousemove', mouseMove)
                canvasElement.removeEventListener('touchend', touchEnd)
                canvasElement.removeEventListener('touchmove', touchMove)
                canvasElement.removeEventListener('touchstart', touchStart)
                enabled = false
            }
        },
        enable: function () {
            if (!enabled) {
                canvasElement.addEventListener('mousedown', mouseDown)
                canvasElement.addEventListener('mousemove', mouseMove)
                canvasElement.addEventListener('touchend', touchEnd)
                canvasElement.addEventListener('touchmove', touchMove)
                canvasElement.addEventListener('touchstart', touchStart)
                enabled = true
            }
        },
    }

}
