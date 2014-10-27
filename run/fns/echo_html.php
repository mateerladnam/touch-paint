<?php

function echo_html ($htmlTag, $links, $scripts) {

    include_once __DIR__.'/../../fns/get_revisions.php';
    $revisions = get_revisions();

    header('Content-Type: text/html; charset=UTF-8');
    echo '<!DOCTYPE html>'
        .$htmlTag
            .'<head>'
                .'<title>Touch Paint</title>'
                .'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />'
                .'<meta name="viewport" content="width=device-width, user-scalable=no" />'
                .'<link rel="icon" type="image/png"'
                .' href="../images/icons/16.png?'.$revisions['images/icons/16.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="32x32"'
                .' href="../images/icons/32.png?'.$revisions['images/icons/32.png'].'" />'
                .'<link rel="icon" type="image/png" sizes="64x64"'
                .' href="../images/icons/64.png?'.$revisions['images/icons/64.png'].'" />'
                .$links
            .'</head>'
            ."<body>$scripts</body>"
        .'</html>';

}
