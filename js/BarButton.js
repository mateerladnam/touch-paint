function BarButton (icon) {

    var classPrefix = 'BarButton'

    var iconElement = Div(classPrefix + '-icon')
    iconElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('BarButton')
    element.appendChild(iconElement)

    return { element: element }

}
