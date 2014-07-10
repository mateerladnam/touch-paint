function FilePanel (newListener, saveListener) {

    var classPrefix = 'FilePanel'

    var newButton = BarButton('file', newListener)
    newButton.addClass(classPrefix + '-newButton')

    var saveButton = BarButton('floppy', saveListener)
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(newButton.element)
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
