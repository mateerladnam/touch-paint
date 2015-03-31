function BucketTool (size, canvas) {

    var enabled = false

    return {
        disable: function () {
            if (!enabled) return
            enabled = false
        },
        enable: function () {
            if (enabled) return
            enabled = true
        },
        setColor: function () {
        },
    }

}
