<?php

function get_revision ($key) {
    static $revisions = [
        'compressed.css' => 20,
        'compressed.js' => 20,
    ];
    return $revisions[$key];
}
