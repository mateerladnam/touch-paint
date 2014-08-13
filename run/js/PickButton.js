function PickButton (clickListener) {
    var button = BarButton('pick', clickListener)
    button.addClass('PickButton')
    return button
}
