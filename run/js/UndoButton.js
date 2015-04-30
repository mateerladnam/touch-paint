function UndoButton (undoListener) {

    function beginUndo () {

        function endUndo () {
            removeEventListener('mouseup', mouseUp)
            removeEventListener('touchend', touchEnd)
            classList.remove('active')
            clearTimeout(repeatTimeout)
        }

        function mouseUp () {
            if (touched) touched = false
            else endUndo()
        }

        function touchEnd (e) {
            touched = true
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === identifier) {
                    identifier = null
                    endUndo()
                }
            }
        }

        function undo () {
            repeatTimeout = setTimeout(undo, undoListener())
        }

        var touched = false

        addEventListener('touchend', touchEnd)
        addEventListener('mouseup', mouseUp)
        classList.add('active')
        undo()

    }

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/undo.svg)'

    var element = Div('Button UndoButton disabled')
    element.appendChild(contentElement)
    element.addEventListener('mousedown', function (e) {
        if (e.button !== 0) return
        e.preventDefault()
        if (touched) touched = false
        else beginUndo()
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        if (identifier === null) {
            e.preventDefault()
            identifier = e.changedTouches[0].identifier
            beginUndo()
        }
    })

    var touched = false
    var identifier = null
    var repeatTimeout
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
