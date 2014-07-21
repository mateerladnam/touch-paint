function Slider (changeListener, endListener) {

    function beginSlide (e) {

        function change (e) {

            var rect = handleWrapperElement.getBoundingClientRect()
            var handleSize = handleElement.offsetHeight

            if (innerWidth > innerHeight) {
                var wrapperHeight = handleWrapperElement.offsetHeight
                ratio = 1 - (e.clientY - rect.top - handleSize / 2) / wrapperHeight
            } else {
                var wrapperWidth = handleWrapperElement.offsetWidth
                ratio = (e.clientX - rect.left - handleSize / 2) / wrapperWidth
            }

            ratio = Math.max(0, Math.min(1, ratio))
            updateHandle()
            changeListener(ratio)

        }

        function end () {
            endSlide()
            endListener()
        }

        function mouseMove (e) {
            if (touched) touched = false
            else change(e)
        }

        function mouseUp (e) {
            if (touched) touched = false
            else end()
        }

        function touchEnd (e) {
            touched = true
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                if (touches[i].identifier === identifier) {
                    e.preventDefault()
                    end()
                    break
                }
            }
        }

        function touchMove (e) {
            touched = true
            var touches = e.changedTouches
            for (var i = 0; i < touches.length; i++) {
                var touch = touches[i]
                if (touch.identifier === identifier) {
                    e.preventDefault()
                    change(touch)
                    break
                }
            }
        }

        endSlide = function () {
            sliding = false
            identifier = null
            handleClassList.remove('active')
            removeEventListener('mousemove', mouseMove)
            removeEventListener('mouseup', mouseUp)
            removeEventListener('touchmove', touchMove)
            removeEventListener('touchend', touchEnd)
        }

        sliding = true
        change(e)
        handleClassList.add('active')
        addEventListener('mousemove', mouseMove)
        addEventListener('mouseup', mouseUp)
        addEventListener('touchmove', touchMove)
        addEventListener('touchend', touchEnd)

    }

    function updateHandle () {
        handleElement.style.top = (1 - ratio) * 100 + '%'
        handleElement.style.left = ratio * 100 + '%'
    }

    var sliding = false
    var classPrefix = 'Slider'
    var touched = false
    var identifier = null
    var ratio = 0

    var handleElement = Div(classPrefix + '-handle')

    var handleClassList = handleElement.classList

    var handleWrapperElement = Div(classPrefix + '-handleWrapper')
    handleWrapperElement.appendChild(handleElement)

    var barElement = Div(classPrefix + '-bar')

    var element = Div(classPrefix)
    element.appendChild(barElement)
    element.appendChild(handleWrapperElement)
    element.addEventListener('mousedown', function (e) {
        if (touched) touched = false
        else beginSlide(e)
    })
    element.addEventListener('touchstart', function (e) {
        touched = true
        if (identifier === null) {
            e.preventDefault()
            var touch = e.changedTouches[0]
            identifier = touch.identifier
            beginSlide(touch)
        }
    })

    updateHandle()

    return {
        barElement: barElement,
        element: element,
        abortTouch: function () {
            if (sliding) endSlide()
        },
        addClass: function (className) {
            element.classList.add(className)
        },
        setRatio: function (_ratio) {
            ratio = _ratio
            updateHandle()
        },
    }

}
