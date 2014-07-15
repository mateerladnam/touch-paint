<?php

header('Content-Type: text/html; charset=UTF-8');

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Touch Paint</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png" href="images/icons/16.png" />'
            .'<link rel="icon" type="image/png" href="images/icons/32.png" sizes="32x32" />'
            .'<link rel="stylesheet" type="text/css" href="index.css" />'
        .'</head>'
        .'<body>'
            .'<img src="images/icons/128.png" />'
            .'<h1>Touch Paint</h1>'
            .'<div>A drawing pad app for Firefox OS.</div>'
            .'<button id="installButton">Install</button>'
            .'<h2>Description</h2>'
            .'<div id="description">'
                .'Touch Paint is Firefox OS app to draw pictures with fingers.'
                .' Its features include: drawing with multiple fingers at once,'
                .' user-friendly interface, adjusting the size of a brush,'
                .' color palette.'
            .'</div>'
            .'<script type="text/javascript" src="index.js"></script>'
        .'</body>'
    .'</html>';
