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
  var html = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>' + svg + '</body></html>';

  fs.writeFile(path.resolve('./preview/index.html'), html, function (err) {
    if (err) throw err;
    console.log('Saved ./preview/index.html' + ' ✔');
  });
};