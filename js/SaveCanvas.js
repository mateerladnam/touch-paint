function SaveCanvas (canvas, width, height) {

    var croppedImage = document.createElement('canvas')
    croppedImage.width = width
    croppedImage.height = height

    var x = width / 2 - canvas.width / 2,
        y = height / 2 - canvas.height / 2

    var c = croppedImage.getContext('2d')
    c.drawImage(canvas, x, y)

    var a = document.createElement('a')
    a.href = croppedImage.toDataURL('image/png')
    a.download = 'picture.png'
    a.style.position = 'absolute'
    a.style.top = a.style.left = 0
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)

}
