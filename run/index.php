<?php

header('Content-Type: text/html; charset=UTF-8');

if (false) {
    $links =
        '<link rel="stylesheet" type="text/css" href="js/Main.css" />'
        .'<link rel="stylesheet" type="text/css" href="css/Button.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/Canvas.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/ColorButtonsPanel.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/Slider.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/SaturationSlider.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/LuminanceSlider.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/EditColorPanel.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/FileButton.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/FilePanel.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/MainPanel.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/PalettePanel.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/ParamsPanel.css" />'
        .'<link rel="stylesheet" type="text/css" href="js/UndoButton.css" />';
} else {
    $links = '<link rel="stylesheet" type="text/css" href="compressed.css" />';
}

if (false) {
    $scripts =
        '<script type="text/javascript" src="js/BarButton.js"></script>'
        .'<script type="text/javascript" src="js/BrushTool.js"></script>'
        .'<script type="text/javascript" src="js/Canvas.js"></script>'
        .'<script type="text/javascript" src="js/ColorButton.js"></script>'
        .'<script type="text/javascript" src="js/ColorButtonsPanel.js"></script>'
        .'<script type="text/javascript" src="js/Div.js"></script>'
        .'<script type="text/javascript" src="js/EditColorPanel.js"></script>'
        .'<script type="text/javascript" src="js/EraserTool.js"></script>'
        .'<script type="text/javascript" src="js/FileButton.js"></script>'
        .'<script type="text/javascript" src="js/FilePanel.js"></script>'
        .'<script type="text/javascript" src="js/LuminanceSlider.js"></script>'
        .'<script type="text/javascript" src="js/MainPanel.js"></script>'
        .'<script type="text/javascript" src="js/PalettePanel.js"></script>'
        .'<script type="text/javascript" src="js/ParamsPanel.js"></script>'
        .'<script type="text/javascript" src="js/SaveCanvas.js"></script>'
        .'<script type="text/javascript" src="js/SaturationSlider.js"></script>'
        .'<script type="text/javascript" src="js/Slider.js"></script>'
        .'<script type="text/javascript" src="js/UndoButton.js"></script>'
        .'<script type="text/javascript" src="js/Main.js"></script>';
} else {
    $scripts = '<script type="text/javascript" src="compressed.js?1"></script>';
}

echo '<!DOCTYPE html>'
    .'<html>'
        .'<head>'
            .'<title>Touch Paint</title>'
            .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
            .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
            .'<link rel="icon" type="image/png" href="../images/icons/16.png" />'
            .'<link rel="icon" type="image/png" href="../images/icons/32.png" sizes="32x32" />'
            .$links
        .'</head>'
        ."<body>$scripts</body>"
    .'</html>';
