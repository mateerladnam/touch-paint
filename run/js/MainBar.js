function MainBar (pickPanel) {

    var classPrefix = 'MainBar'

    var barElement = Div(classPrefix + '-bar')

    var scrollElement = Div(classPrefix + '-scroll')
    scrollElement.appendChild(barElement)
    scrollElement.appendChild(pickPanel.element)

    var element = Div(classPrefix)
    element.appendChild(scrollElement)

    var classList = scrollElement.classList

    return {
        element: element,
        addButton: function (button) {
            barElement.appendChild(button.element)
        },
        hide: function () {
            classList.add('hidden')
        },
        show: function () {
            classList.remove('hidden')
        },
    }

}
