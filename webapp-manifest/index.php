<?php

header('Content-Type: application/x-web-app-manifest+json');

echo json_encode([
    'name' => 'Touch Paint',
    'description' => 'A program to draw with your finger.',
    'launch_path' => '/run/',
    'appcache_path' => '/run/cache-manifest/',
    'fullscreen' => 'true',
    'developer' => [
        'name' => 'Qliavi Team',
        'url' => 'http://qliavi.com/',
    ],
    'icons' => [
        '16' => '/images/icons/16.png',
        '32' => '/images/icons/32.png',
        '90' => '/images/icons/90.png',
        '120' => '/images/icons/120.png',
        '128' => '/images/icons/128.png',
        '256' => '/images/icons/256.png',
    ],
]);
