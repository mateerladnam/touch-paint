<?php

header('Content-Type: application/x-web-app-manifest+json');

echo json_encode([
    'name' => 'Touch Paint',
    'description' => 'a',
    'icons' => [
        '16' => 'sites/paint/images/icons/16.png',
        '32' => 'sites/paint/images/icons/32.png',
        '128' => 'sites/paint/images/icons/128.png',
    ],
]);
