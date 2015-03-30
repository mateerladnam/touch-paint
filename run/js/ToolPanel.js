function ToolPanel (pencilListener, bucketListener) {

    function hide () {
        classList.remove('visible')
    }

    var classPrefix = 'ToolPanel'

    var pencilButton = BarButton('pencil', function () {
        bucketButton.uncheck()
        pencilButton.check()
        pencilListener()
        hide()
    })
    pencilButton.addClass(classPrefix + '-pencilButton')
    pencilButton.check()

    var bucketButton = BarButton('bucket', function () {
        pencilButton.uncheck()
        bucketButton.check()
        bucketListener()
        hide()
    })
    bucketButton.addClass(classPrefix + '-bucketButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(pencilButton.element)
    contentElement.appendChild(bucketButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var classList = contentElement.classList

    return {
        element: element,
        hide: hide,
        show: function () {
            classList.add('visible')
        },
    }

}
