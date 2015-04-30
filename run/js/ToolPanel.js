function ToolPanel (pencilListener, lineListener, rectangleListener, bucketListener) {

    function hide () {
        classList.remove('visible')
        visible = false
    }

    var classPrefix = 'ToolPanel'

    var pencilButton = BarButton('pencil', function () {
        lineButton.uncheck()
        rectangleButton.uncheck()
        bucketButton.uncheck()
        pencilButton.check()
        pencilListener()
        hide()
    })
    pencilButton.addClass(classPrefix + '-pencilButton')
    pencilButton.check()

    var lineButton = BarButton('line', function () {
        pencilButton.uncheck()
        rectangleButton.uncheck()
        bucketButton.uncheck()
        lineButton.check()
        lineListener()
        hide()
    })
    lineButton.addClass(classPrefix + '-lineButton')

    var rectangleButton = BarButton('rectangle', function () {
        pencilButton.uncheck()
        lineButton.uncheck()
        bucketButton.uncheck()
        rectangleButton.check()
        rectangleListener()
        hide()
    })
    rectangleButton.addClass(classPrefix + '-rectangleButton')

    var bucketButton = BarButton('bucket', function () {
        pencilButton.uncheck()
        lineButton.uncheck()
        rectangleButton.uncheck()
        bucketButton.check()
        bucketListener()
        hide()
    })
    bucketButton.addClass(classPrefix + '-bucketButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(pencilButton.element)
    contentElement.appendChild(lineButton.element)
    contentElement.appendChild(rectangleButton.element)
    contentElement.appendChild(bucketButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var classList = contentElement.classList

    var visible = false

    return {
        element: element,
        hide: hide,
        isVisible: function () {
            return visible
        },
        show: function () {
            classList.add('visible')
            visible = true
        },
    }

}
