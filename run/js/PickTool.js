function PickTool (canvas, pickListener) {

    function pick (e) {
        var rect = canvasElement.getBoundingClientRect(),
            x = e.clientX - rect.left,
            y = e.clientY - rect.top,
            imageData = c.getImageData(x, y, 1, 1),
            data = imageData.data,
            hsl = rgb2hsl(data[0], data[1], data[2])
        pickListener(hsl.h, hsl.s, hsl.l)
    }

    function touchStart (e) {
        if (identifier !== null) return
        var touch = e.changedTouches[0]
        identifier = touch.identifier
        pick(touch)
    }

    function touchMove (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            var touch = touches[i]
            if (touch.identifier === identifier) {
                pick(touch)
                break
            }
        }
    }

    function touchEnd (e) {
        var touches = e.changedTouches
        for (var i = 0; i < touches.length; i++) {
            if (touches[i].identifier === identifier) {
                identifier = null
                break
            }
        }
    }

    var identifier = null,
        enabled = false,
        canvasElement = canvas.canvas,
        c = canvasElement.getContext('2d')

    return {
        disable: function () {
            if (enabled) {
                canvasElement.removeEventListener('touchstart', touchStart)
                canvasElement.removeEventListener('touchmove', touchMove)
                canvasElement.removeEventListener('touchend', touchEnd)
                enabled = false
            }
        },
        enable: function () {
            if (!enabled) {
                canvasElement.addEventListener('touchstart', touchStart)
                canvasElement.addEventListener('touchmove', touchMove)
                canvasElement.addEventListener('touchend', touchEnd)
                enabled = true
            }
        },
    }

}
