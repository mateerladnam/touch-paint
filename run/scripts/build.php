#!/usr/bin/php
<?php

if (!isset($argv)) die();

chdir(__DIR__);

$compressedCssFile = '../compressed.css';
$compressedJsFile = '../compressed.js';
$get_revisions_file = '../fns/get_revisions.php';

$compressedCss = file_get_contents($compressedJsFile);
$compressedJs = file_get_contents($compressedCssFile);

include_once $get_revisions_file;
$revisions = get_revisions();

system('./compress-css.js');
system('./compress-js.js');

clearstatcache();

$changed = false;
if (file_get_contents($compressedCssFile) != $compressedCss) {
    $revisions['compressed.css']++;
    $changed = true;
}
if (file_get_contents($compressedJsFile) != $compressedJs) {
    $revisions['compressed.js']++;
    $changed = true;
}

if ($changed) {

    $values = '';
    foreach ($revisions as $key => $value) {
        $values .= "        '$key' => $value,\n";
    }

    $content =
        "<?php\n\n"
        ."function get_revisions () {\n"
        ."    return [\n"
        .$values
        ."    ];\n"
        ."}\n";
    file_put_contents($get_revisions_file, $content);

}

echo "Done\n";
