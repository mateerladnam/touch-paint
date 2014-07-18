<?php

include_once 'fns/echo_html.php';
include_once 'fns/get_revision.php';
echo_html(
    '<html manifest="cache-manifest/">',
    '<link rel="stylesheet" type="text/css" href="compressed.css?'.get_revision('compressed.css').'" />',
    '<script type="text/javascript" src="compressed.js?'.get_revision('compressed.js').'"></script>'
);
