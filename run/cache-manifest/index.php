<?php

header('Content-Type: text/cache-manifest');

include_once '../fns/get_run_revisions.php';
$revisions = get_run_revisions();

echo
    "CACHE MANIFEST\n"
    ."# v2\n"
    .'../compressed.css?'.$revisions['compressed.css']."\n"
    .'../compressed.js?'.$revisions['compressed.js']."\n"
    ."../images/burger.svg\n"
    ."../images/cancel.svg\n"
    ."../images/color-background.svg\n"
    ."../images/eraser.svg\n"
    ."../images/file.svg\n"
    ."../images/open.svg\n"
    ."../images/palette.svg\n"
    ."../images/params.svg\n"
    ."../images/pencil.svg\n"
    ."../images/save.svg\n"
    ."../images/undo.svg\n";
