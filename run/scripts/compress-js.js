#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs')
var uglifyJs = require('uglify-js')

var files = [
    'js/BarButton.js',
    'js/BrushTool.js',
    'js/Canvas.js',
    'js/ColorButton.js',
    'js/ColorButtonsPanel.js',
    'js/Div.js',
    'js/EditColorPanel.js',
    'js/EraserTool.js',
    'js/FileButton.js',
    'js/FilePanel.js',
    'js/LuminanceSlider.js',
    'js/MainPanel.js',
    'js/PalettePanel.js',
    'js/ParamsPanel.js',
    'js/SaveCanvas.js',
    'js/SaturationSlider.js',
    'js/Slider.js',
    'js/UndoButton.js',
    'js/Main.js',
]

var source = '(function () {\n'
files.forEach(function (file) {
    source += fs.readFileSync(file, 'utf8') + ';\n'
})
source += '\n})()'

var ast = uglifyJs.parse(source)
ast.figure_out_scope()
var compressor = uglifyJs.Compressor({})
var compressedAst = ast.transform(compressor)
compressedAst.figure_out_scope()
compressedAst.compute_char_frequency()
compressedAst.mangle_names()
var compressedSource = compressedAst.print_to_string()

fs.writeFileSync('combined.js', source)
fs.writeFileSync('compressed.js', compressedSource)