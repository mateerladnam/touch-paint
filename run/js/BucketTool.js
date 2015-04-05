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

                if (x < wrapperLeft || x == wrapperRight ||
                    y < wrapperTop || y == wrapperBottom) return

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

            var neighbors = Object.create(null)

            var maxDifference = 20

            while (queue.length) {

                var coords = queue.shift()

                var pixelX = coords[0],
                    pixelY = coords[1]

                var rIndex = (pixelY * width + pixelX) * 4,
                    gIndex = rIndex + 1,
                    bIndex = gIndex + 1

                var r = imageDataData[rIndex],
                    g = imageDataData[gIndex],
                    b = imageDataData[bIndex]

                var diffR = Math.abs(rMatch - r),
                    diffG = Math.abs(gMatch - g),
                    diffB = Math.abs(bMatch - b)

                var difference = Math.max(diffR, diffG, diffB)
                if (difference > maxDifference) {
                    if (!neighbors[pixelY]) neighbors[pixelY] = Object.create(null)
                    neighbors[pixelY][pixelX] = true
                    continue
                }

                imageDataData[rIndex] = red
                imageDataData[gIndex] = green
                imageDataData[bIndex] = blue

                enqueue(pixelX + 1, pixelY)
                enqueue(pixelX - 1, pixelY)
                enqueue(pixelX, pixelY + 1)
                enqueue(pixelX, pixelY - 1)

            }

            for (var y in neighbors) {
                var xs = neighbors[y]
                for (var x in xs) {

                    var rIndex = (y * width + Number(x)) * 4,
                        gIndex = rIndex + 1,
                        bIndex = gIndex + 1

                    imageDataData[rIndex] = (imageDataData[rIndex] + red) / 2
                    imageDataData[gIndex] = (imageDataData[gIndex] + green) / 2
                    imageDataData[bIndex] = (imageDataData[bIndex] + blue) / 2

                }
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

    var wrapperTop, wrapperRight, wrapperBottom, wrapperLeft

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
        resize: function (wrapperWidth, wrapperHeight) {

            var halfWidth = canvasElement.width / 2,
                halfHeight = canvasElement.height / 2

            var halfWrapperWidth = wrapperWidth / 2,
                halfWrapperHeight = wrapperHeight / 2

            wrapperTop = Math.floor(halfHeight - halfWrapperHeight)
            wrapperRight = Math.floor(halfWidth + halfWrapperWidth)
            wrapperBottom = Math.ceil(halfHeight + halfWrapperHeight)
            wrapperLeft = Math.ceil(halfWidth - halfWrapperWidth)

        },
    }

}
