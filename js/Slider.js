function Slider (ratio, changeListener, endListener) {

    function change (touch) {

        var rect = handleWrapperElement.getBoundingClientRect()
        var handleSize = handleElement.offsetHeight

        if (innerWidth > innerHeight) {
            var wrapperHeight = handleWrapperElement.offsetHeight
            ratio = 1 - (touch.clientY - rect.top - handleSize / 2) / wrapperHeight
        } else {
            var wrapperWidth = handleWrapperElement.offsetWidth
            ratio = (touch.clientX - rect.left - handleSize / 2) / wrapperWidth
        }

        ratio = Math.max(0, Math.min(1, ratio))
        updateHandle()
        changeListener(ratio)

    }

    function updateHandle () {
        handleElement.style.top = (1 - ratio) * 100 + '%'
        handleElement.style.left = ratio * 100 + '%'
    }

    var classPrefix = 'Slider'

    var identifier

    var handleElement = Div(classPrefix + '-handle')

    var handleWrapperElement = Div(classPrefix + '-handleWrapper')
    handleWrapperElement.appendChild(handleElement)

    var barElement = Div(classPrefix + '-bar')

    var element = Div(classPrefix)
    element.appendChild(barElement)
    element.appendChild(handleWrapperElement)
    element.addEventListener('touchstart', function (e) {
        if (!identifier) {

            e.preventDefault()
            var touch = e.changedTouches[0]
            identifier = touch.identifier
            handleElement.classList.add('active')

            change(touch)

            addEventListener('touchmove', function (e) {
                var touches = e.changedTouches
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches[i]
                    if (touch.identifier == identifier) {
                        e.preventDefault()
                        change(touch)
                        break
                    }
                }
            })

            addEventListener('touchend', function (e) {
                var touches = e.changedTouches
                for (var i = 0; i < touches.length; i++) {
                    if (touches[i].identifier == identifier) {
                        e.preventDefault()
                        identifier = null
                        handleElement.classList.remove('active')
                        endListener()
                        break
                    }
                }
            })

        }
    })

    updateHandle()

    return { element: element }

}
