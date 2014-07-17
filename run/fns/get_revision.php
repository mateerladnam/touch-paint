<?php

function get_revision ($key) {
    static $revisions = [
        'compressed.css' => 21,
        'compressed.js' => 21,
    ];
    return $revisions[$key];
}
