function Slider (changeListener, endListener) {

    function update (clientX) {
        var rect = element.getBoundingClientRect()
        var handleWidth = handleElement.offsetWidth
        var ratio = (clientX - rect.left - handleWidth) / (element.offsetWidth - handleWidth)
        ratio = Math.max(0, Math.min(1, ratio))
        handleElement.style.left = ratio * 100 + '%'
        changeListener(ratio)
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

            var touch = e.changedTouches[0]
            identifier = touch.identifier
            handleElement.classList.add('active')

            update(touch.clientX)

            addEventListener('touchmove', function (e) {
                var touches = e.changedTouches
                for (var i = 0; i < touches.length; i++) {
                    var touch = touches[i]
                    if (touch.identifier == identifier) {
                        update(touch.clientX)
                    }
                }
            })

            addEventListener('touchend', function (e) {
                var touches = e.touches
                for (var i = 0; i < touches.length; i++) {
                    if (touches[i].identifier == identifier) {
                        identifier = null
                        handleElement.classList.remove('active')
                        endListener()
                    }
                }
            })

        }
    })

    return { element: element }

}
