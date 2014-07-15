<?php

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Touch Paint</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png" href="run/images/icons/16.png" />'
            .'<link rel="icon" type="image/png" href="run/images/icons/32.png" sizes="32x32" />'
        .'</head>'
        .'<body>'
            .'<h1>Touch Paint</h1>'
            .'<div>'
                .'Drawing pictures with your fingers has never been this easy.'
                .' Touch Paint allows you to draw with multiple fingers at once.'
            .'</div>'
            .'<button id="installButton">Install as a Firefox App</button>'
            .'<script type="text/javascript" src="index.js"></script>'
        .'</body>'
    .'</html>';
