function FileButton (icon) {

    var input = document.createElement('input')
    input.type = 'file'
    input.accept = 'image/*'
    input.className = 'FileButton-input'

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)
    element.appendChild(input)

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
    }

}
