var installButton = document.getElementById('installButton')
installButton.addEventListener('click', function () {
    var manifest = location.protocol + '/' + location.host + location.pathname + 'run/webapp-manifest/'
    var installRequest = navigator.mozApps.install(manifest)
})
