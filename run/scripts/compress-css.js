#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs'),
    uglifyCss = require('uglifycss')

var files = [
    'js/Main.css',
    'css/Button.css',
    'js/Canvas.css',
    'js/ColorButtonsPanel.css',
    'js/Slider.css',
    'js/SaturationSlider.css',
    'js/LuminanceSlider.css',
    'js/EditColorPanel.css',
    'js/FileButton.css',
    'js/FilePanel.css',
    'js/MainPanel.css',
    'js/PalettePanel.css',
    'js/ParamsPanel.css',
    'js/UndoButton.css',
]

var source = ''
files.forEach(function (file) {
    source += fs.readFileSync(file, 'utf-8') + '\n'
})

var compressCss = uglifyCss.processString(source)
fs.writeFileSync('compressed.css', compressCss)
