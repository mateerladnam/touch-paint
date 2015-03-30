function ToolPanel (brushListener, bucketListener) {

    var classPrefix = 'ToolPanel'

    var brushButton = BarButton('brush', brushListener)
    brushButton.addClass(classPrefix + '-brushButton')

    var bucketButton = BarButton('bucket', bucketListener)
    bucketButton.addClass(classPrefix + '-bucketButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(brushButton.element)
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
