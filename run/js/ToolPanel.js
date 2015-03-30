function ToolPanel (pencilListener, bucketListener) {

    var classPrefix = 'ToolPanel'

    var pencilButton = BarButton('pencil', pencilListener)
    pencilButton.addClass(classPrefix + '-pencilButton')

    var bucketButton = BarButton('bucket', bucketListener)
    bucketButton.addClass(classPrefix + '-bucketButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(pencilButton.element)
    contentElement.appendChild(bucketButton.element)

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    var classList = contentElement.classList

    return {
        element: element,
        hide: function () {
            classList.remove('visible')
        },
        show: function () {
            classList.add('visible')
        },
    }

}
