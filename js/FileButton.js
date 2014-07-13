function FileButton (icon, openListener) {

    function newInput () {
        var input = document.createElement('input')
        input.type = 'file'
        input.accept = 'image/*'
        input.className = 'FileButton-input'
        input.addEventListener('change', function () {
            var reader = new FileReader
            reader.readAsDataURL(input.files[0])
            reader.onload = function () {
                var image = new Image
                image.src = reader.result
                image.onload = function () {
                    openListener(image)
                }
                image.onabort = function () {
                    console.log('image.onabort')
                }
                image.onerror = function () {
                    console.log('image.onerror')
                }
            }
            reader.onabort = function () {
                console.log('reader.onabort')
            }
            reader.onerror = function () {
                console.log('reader.onerror')
            }
            element.removeChild(input)
            newInput()
        })
        element.appendChild(input)
    }

    var contentElement = Div('Button-content')
    contentElement.style.backgroundImage = 'url(images/' + icon + '.svg)'

    var element = Div('Button')
    element.appendChild(contentElement)

    newInput()

    return {
        element: element,
        addClass: function (className) {
            element.classList.add(className)
        },
    }

}
