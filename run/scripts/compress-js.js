#!/usr/bin/env node

process.chdir(__dirname)
process.chdir('..')

var fs = require('fs')
var uglifyJs = require('uglify-js')

var files = [
    'AlphaSlider',
    'BarButton',
    'BucketTool',
    'ButtonExpandable',
    'Canvas',
    'ColorButton',
    'ColorButtonsPanel',
    'Div',
    'EditColorPanel',
    'EllipseTool',
    'FileButton',
    'FilePanel',
    'hsl2rgb',
    'HueSlider',
    'LineTool',
    'LuminanceSlider',
    'MainBar',
    'MainPanel',
    'OpenImage',
    'PalettePanel',
    'ParamsPanel',
    'PencilTool',
    'PickButton',
    'PickPanel',
    'PickTool',
    'RectangleTool',
    'rgb2hsl',
    'SaveCanvas',
    'SaturationSlider',
    'Slider',
    'ToolButton',
    'ToolPanel',
    'UndoButton',
    'Main',
]

var source = '(function () {\n'
files.forEach(function (file) {
    source += fs.readFileSync('js/' + file + '.js', 'utf8') + ';\n'
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
