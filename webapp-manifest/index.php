<?php

header('Content-Type: application/x-web-app-manifest+json');

echo json_encode([
    'name' => 'Touch Paint',
    'description' => 'A program to draw with your finger.',
    'launch_path' => 'run/',
    'fullscreen' => 'true',
    'developer' => [
        'name' => 'Qliavi Team',
        'url' => 'http://qliavi.com/',
    ],
    'icons' => [
        '16' => 'images/icons/16.png',
        '32' => 'images/icons/32.png',
        '128' => 'images/icons/128.png',
    ],
]);
