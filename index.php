<?php

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Touch Paint</title>'
        .'</head>'
        .'<body>'
            .'<script type="text/javascript">'
."var manifest = location.protocol + '/' + location.host + location.pathname + 'run/webapp-manifest/'\n"
."var installRequest = navigator.mozApps.install(manifest)\n"
            .'</script>'
        .'</body>'
    .'</html>';
