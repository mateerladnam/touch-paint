function OpenImage (c, image, visibleWidth, visibleHeight) {

    var canvas = c.canvas,
        visibleRatio = visibleWidth / visibleHeight,
        imageRatio = image.width / image.height,
        targetWidth, targetHeight

    if (visibleRatio > imageRatio) {
        targetWidth = visibleWidth
        targetHeight = targetWidth / imageRatio
    } else {
        targetHeight = visibleHeight
        targetWidth = targetHeight * imageRatio
    }

    var x = (canvas.width - targetWidth) / 2,
        y = (canvas.height - targetHeight) / 2
    c.globalAlpha = 1
    c.drawImage(image, x, y, targetWidth, targetHeight)

}
