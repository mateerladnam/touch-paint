function ParamsPanel () {

    var classPrefix = 'ParamsPanel'

    var contentElement = Div(classPrefix + '-content')

    var element = Div(classPrefix)
    element.appendChild(contentElement)

    return { element: element }

}
