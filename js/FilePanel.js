function FilePanel (saveListener) {

    var classPrefix = 'FilePanel'

    var saveButton = BarButton('floppy', saveListener)
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(saveButton.element)

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
