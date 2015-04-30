#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs'),
    uglifyCss = require('uglifycss')

var files = [
    'Main',
    'Button',
    'Canvas',
    'ColorButton',
    'ColorButtonsPanel',
    'Slider',
    'AlphaSlider',
    'SaturationSlider',
    'LuminanceSlider',
    'EditColorPanel',
    'FileButton',
    'FilePanel',
    'HueSlider',
    'LineTool',
    'MainBar',
    'MainPanel',
    'PalettePanel',
    'ParamsPanel',
    'PickButton',
    'PickPanel',
    'RectangleTool',
    'ToolButton',
    'ToolPanel',
    'UndoButton',
]

var source = ''
files.forEach(function (file) {
    source += fs.readFileSync('css/' + file + '.css', 'utf-8') + '\n'
})

var compressCss = uglifyCss.processString(source)
fs.writeFileSync('compressed.css', compressCss)
