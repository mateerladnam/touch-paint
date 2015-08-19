function ButtonExpandable (element) {

    var topElement = Div('ButtonExpandable-top')
    topElement.style.backgroundImage = 'url(images/top-expandable.svg)'

    var leftElement = Div('ButtonExpandable-left')
    leftElement.style.backgroundImage = 'url(images/left-expandable.svg)'

    var visible = false

    return {
        hide: function () {
            if (visible === false) return
            visible = false
            element.removeChild(topElement)
            element.removeChild(leftElement)
        },
        show: function () {
            if (visible === true) return
            visible = true
            element.appendChild(topElement)
            element.appendChild(leftElement)
        },
    }

}
