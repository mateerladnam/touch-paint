(function () {

    var horizontalProgressElement = Div('Main-horizontalProgress')

    var verticalProgressElement = Div('Main-verticalProgress')

    var loadBarElement = Div('Main-loadBar')
    loadBarElement.appendChild(horizontalProgressElement)
    loadBarElement.appendChild(verticalProgressElement)

    var mainPanel = MainPanel()

    var body = document.body
    body.appendChild(mainPanel.element)
    body.appendChild(loadBarElement)

    var finished = 0
    var icons = ['bucket', 'burger', 'ellipse', 'eraser',
        'left-expandable', 'line', 'palette', 'params',
        'pencil', 'rectangle', 'top-expandable', 'undo']
    icons.forEach(function (icon) {
        var image = new Image
        image.src = 'images/' + icon + '.svg'
        image.onload = image.onerror = image.onabort = function () {

            finished++

            var percent = finished / icons.length * 100 + '%'
            horizontalProgressElement.style.width = percent
            verticalProgressElement.style.height = percent

            if (finished == icons.length) {
                mainPanel.show()
                setTimeout(function () {
                    loadBarElement.classList.add('hidden')
                    setTimeout(function () {
                        body.removeChild(loadBarElement)
                    }, 250)
                }, 250)
            }

        }
    })

    var resize = mainPanel.resize
    addEventListener('resize', resize)
    resize()

})()
