function MainPanel () {

    var classPrefix = 'MainPanel'

    var brushButton = BarButton('pencil')

    var barElement = Div(classPrefix + '-bar')
    barElement.appendChild(brushButton.element)

    var element = Div(classPrefix)
    element.appendChild(barElement)

    return {
        element: element,
    }

}
