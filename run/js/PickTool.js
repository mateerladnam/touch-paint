function PickTool (canvas, pickListener) {

    function beginTool (e) {
        var xy = getXY(e)
        pick(xy[0], xy[1])
    }

    function getXY (e) {
        var rect = canvasElement.getBoundingClientRect(),
            x = Math.floor(e.clientX - rect.left),
            y = Math.floor(e.clientY - rect.top)
        return [x, y]
    }

    function mouseDown (e) {

        function mouseMove (e) {
            e.preventDefault()
            if (touched) touched = false
            else moveTool(e)
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
            beginTool(e)
            addEventListener('mousemove', mouseMove)
            addEventListener('mouseup', mouseUp)
        }
    }

    function moveTool (e) {
        var xy = getXY(e), x = xy[0], y = xy[1]
        if (x >= 0 && x < canvasWidth &&
            y >= 0 && y < canvasHeight) pick(x, y)
    }

    function pick (x, y) {
        var offset = (x + y * canvasWidth) * 4,
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
                moveTool(touch)
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
        beginTool(touch)
    }

    var data,
        touched = false,
        identifier = null,
        enabled = false,
        canvasElement = canvas.canvas,
        canvasWidth = canvasElement.width,
        canvasHeight = canvasElement.height,
        c = canvasElement.getContext('2d')

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            canvasElement.removeEventListener('touchstart', touchStart)
            removeEventListener('touchmove', touchMove)
            removeEventListener('touchend', touchEnd)
            removeEventListener('touchcancel', touchEnd)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            canvasElement.addEventListener('touchstart', touchStart)
            addEventListener('touchmove', touchMove)
            addEventListener('touchend', touchEnd)
            addEventListener('touchcancel', touchEnd)
            enabled = true
            data = c.getImageData(0, 0, canvasWidth, canvasHeight).data
        },
    }

}
