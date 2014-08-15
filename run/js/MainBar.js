function MainBar (pickPanel) {

    var classPrefix = 'MainBar'

    var alternativeBarElement = Div(classPrefix + '-alternativeBar')
    alternativeBarElement.appendChild(pickPanel.element)

    var barElement = Div(classPrefix + '-bar')

    var scrollElement = Div(classPrefix + '-scroll')
    scrollElement.appendChild(barElement)
    scrollElement.appendChild(alternativeBarElement)

    var element = Div(classPrefix)
    element.appendChild(scrollElement)

    var classList = scrollElement.classList

    return {
        element: element,
        addButton: function (button) {
            barElement.appendChild(button.element)
        },
        show: function () {
            element.classList.add('visible')
        },
        slide: function () {
            classList.add('slide')
        },
        unslide: function () {
            classList.remove('slide')
        },
    }

}
