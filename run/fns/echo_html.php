<?php

function echo_html ($links, $scripts) {
    header('Content-Type: text/html; charset=UTF-8');
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
}
