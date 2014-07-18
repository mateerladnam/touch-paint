(function () {

    var progressElement = Div('Main-progress')

    var loadBarElement = Div('Main-loadBar')
    loadBarElement.appendChild(progressElement)

    document.body.appendChild(loadBarElement)

    var finished = 0
    var icons = ['pencil', 'eraser', 'palette', 'params', 'undo', 'burger']
    icons.forEach(function (icon) {
        var image = new Image
        image.src = 'images/' + icon + '.svg'
        image.onload = image.onerror = image.onabort = function () {
            finished++
            progressElement.style.width = finished / icons.length * 100 + '%'
            if (finished == icons.length) {
                var mainPanel = MainPanel()
                document.body.removeChild(loadBarElement)
                document.body.appendChild(mainPanel.element)
            }
        }
    })

})()
