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
                    element.classList.remove('active')
                    removeEventListener('touchend', touchEnd)
                    clearInterval(repeatInterval)
                }
            }
        }

        if (identifier === null) {
            e.preventDefault()
            identifier = e.changedTouches[0].identifier
            element.classList.add('active')
            addEventListener('touchend', touchEnd)
            repeatInterval = setInterval(undoListener, 60)
            undoListener()
        }

    })

    var identifier = null
    var repeatInterval

    return {
        element: element,
        disable: function () {
            element.classList.add('disabled')
        },
        enable: function () {
            element.classList.remove('disabled')
        },
    }

}
