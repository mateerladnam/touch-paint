function UndoButton (undoListener) {

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/undo.svg)'

    var element = Div('Button UndoButton disabled')
    element.appendChild(contentElement)
    element.addEventListener('touchstart', function (e) {

        function touchEnd (e) {
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === identifier) {
                    identifier = null
                    classList.remove('active')
                    removeEventListener('touchend', touchEnd)
                    clearInterval(repeatInterval)
                }
            }
        }

        if (identifier === null) {
            e.preventDefault()
            identifier = e.changedTouches[0].identifier
            classList.add('active')
            addEventListener('touchend', touchEnd)
            repeatInterval = setInterval(undoListener, 50)
            undoListener()
        }

    })

    var identifier = null
    var repeatInterval
    var classList = element.classList

    return {
        element: element,
        disable: function () {
            classList.add('disabled')
        },
        enable: function () {
            classList.remove('disabled')
        },
    }

}
