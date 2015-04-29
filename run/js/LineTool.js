function LineTool (size, canvas) {

    function mouseDown () {
        console.log('line tool mouse down')
    }

    var enabled = false
    var canvasElement = canvas.canvas
    var hue = 0, saturation = 0, luminance = 0, alpha = 1
    var hsl = 'hsla(0, 0%, 0%, 1)'

    return {
        disable: function () {
            canvasElement.removeEventListener('mousedown', mouseDown)
        },
        enable: function () {
            canvasElement.addEventListener('mousedown', mouseDown)
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {
            hue = _hue
            saturation = _saturation
            luminance = _luminance
            alpha = _alpha
            hsl = 'hsla(' + hue + ', ' + saturation + '%, ' + luminance + '%, ' + alpha + ')'
        },
        setSize: function (_size) {
            size = _size
        },
    }

}
