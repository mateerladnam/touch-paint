function BucketTool (canvas) {

    function mouseDown (e) {

        var rect = canvasElement.getBoundingClientRect(),
            mouseX = Math.floor(e.clientX - rect.left),
            mouseY = Math.floor(e.clientY - rect.top)

        var c = canvasElement.getContext('2d')

        var imageData = c.getImageData(mouseX, mouseY, 1, 1),
            imageDataData = imageData.data

        var rMatch = imageDataData[0],
            gMatch = imageDataData[1],
            bMatch = imageDataData[2]

        canvas.operate(function (c) {

            function enqueue (x, y) {

                if (x < 0 || x == width || y < 0 || y == height) return

                if (passed[y]) {
                    if (passed[y][x]) return
                } else {
                    passed[y] = Object.create(null)
                }

                passed[y][x] = true
                queue.push([x, y])

            }

            var width = canvasElement.width,
                height = canvasElement.height

            var imageData = c.getImageData(0, 0, width, height)
            var imageDataData = imageData.data

            var queue = []
            var passed = Object.create(null)
            enqueue(mouseX, mouseY)

            var maxDifference = 20

            while (queue.length) {

                var coords = queue.shift()

                var pixelX = coords[0],
                    pixelY = coords[1]

                var rIndex = (pixelY * width + pixelX) * 4,
                    gIndex = rIndex + 1,
                    bIndex = gIndex + 1,
                    aIndex = bIndex + 1

                var r = imageDataData[rIndex],
                    g = imageDataData[gIndex],
                    b = imageDataData[bIndex],
                    a = imageDataData[aIndex]

                var diffR = Math.abs(rMatch - r),
                    diffG = Math.abs(gMatch - g),
                    diffB = Math.abs(bMatch - b)

                var difference = Math.max(diffR, diffG, diffB)
                if (difference > maxDifference) continue

                imageDataData[rIndex] = red
                imageDataData[gIndex] = green
                imageDataData[bIndex] = blue

                enqueue(pixelX + 1, pixelY)
                enqueue(pixelX - 1, pixelY)
                enqueue(pixelX, pixelY + 1)
                enqueue(pixelX, pixelY - 1)

            }

            c.putImageData(imageData, 0, 0)

        })

    }

    var red = 0,
        green = 0,
        blue = 0,
        alpha = 1

    var canvasElement = canvas.canvas

    var enabled = false

    return {
        disable: function () {
            if (!enabled) return
            canvasElement.removeEventListener('mousedown', mouseDown)
            enabled = false
        },
        enable: function () {
            if (enabled) return
            canvasElement.addEventListener('mousedown', mouseDown)
            enabled = true
        },
        setColor: function (_hue, _saturation, _luminance, _alpha) {
            var rgb = hsl2rgb(_hue, _saturation, _luminance)
            red = rgb.r
            green = rgb.g
            blue = rgb.b
            alpha = _alpha
        },
    }

}
