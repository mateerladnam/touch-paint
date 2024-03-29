function FilePanel (newListener, openListener, saveListener) {

    var classPrefix = 'FilePanel'

    var newButton = BarButton('file', newListener)
    newButton.addClass(classPrefix + '-newButton')

    var openButton = FileButton('open', openListener)
    openButton.addClass(classPrefix + '-openButton')

    var saveButton = BarButton('save', saveListener)
    saveButton.addClass(classPrefix + '-saveButton')

    var contentElement = Div(classPrefix + '-content')
    contentElement.appendChild(newButton.element)
    contentElement.appendChild(openButton.element)
    contentElement.appendChild(saveButton.element)

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
