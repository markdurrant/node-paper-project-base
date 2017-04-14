var path = require('path');
var fs = require('fs');

function getDateStr() {
  var now = new Date();
  var dateStr = now.getFullYear() + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();

  return dateStr;
}

exports.outputToSvg = function(name, svg, seed) {
  var fileName = './svg/' + name + '-' + seed + '-' + getDateStr() + '.svg';

  fs.writeFile(path.resolve(fileName), svg, function (err) {
    if (err) throw err;
    console.log('Saved ' + fileName + ' ✔');
  });
};

exports.outputToHtml = function(svg) {
  var style = '<style type="text/css">body {background: #e9e9e9; padding-top: 5vh; margin: 0;} svg {background: #fff; max-height: 90vh; outline: 1px solid #ccc; box-shadow: 0 0 20px #ccc; max-width: 63.6364vh; margin: 0 auto; display: block;}</style>';
  var html = '<!doctype html><html><head>' + style + '</head><body>' + svg + '</body></html>';

  fs.writeFile(path.resolve('./preview/index.html'), html, function (err) {
    if (err) throw err;
    console.log('Saved ./preview/index.html' + ' ✔');
  });
};