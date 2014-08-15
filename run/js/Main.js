(function () {

    var progressElement = Div('Main-progress')

    var loadBarElement = Div('Main-loadBar')
    loadBarElement.appendChild(progressElement)

    var mainPanel = MainPanel()

    var body = document.body
    body.appendChild(mainPanel.element)
    body.appendChild(loadBarElement)

    var finished = 0
    var icons = ['pencil', 'eraser', 'palette', 'params', 'undo', 'burger']
    icons.forEach(function (icon) {
        var image = new Image
        image.src = 'images/' + icon + '.svg'
        image.onload = image.onerror = image.onabort = function () {
            finished++
            progressElement.style.width = finished / icons.length * 100 + '%'
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

})()
