function FilePanel (changeListener, closeListener) {

    var classPrefix = 'FilePanel'

    var contentElement = Div(classPrefix + '-content')

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return {
        element: element,
        hide: function () {
            contentElement.classList.remove('visible')
        },
        show: function () {
            contentElement.classList.add('visible')
        },
    }

}
