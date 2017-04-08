var path = require('path');
var fs = require('fs');

function addUnitsToSvg(svg, units) {
  var rx = /width="([0-9]+)" height="([0-9]+)"/;

  var attr = 'width="' + svg.match(rx)[1] + units +
            '" height="' + svg.match(rx)[2] + units +
            '" viewbox="0 0 ' + svg.match(rx)[1] + ' ' + svg.match(rx)[2] + '"';

  return svg.replace(rx, attr);
}

function addEncoding(svg) {
  return '<?xml version="1.0" encoding="utf-8"?>' + svg;
}

exports.outputToSvg = function(file, svg, units) {
  svg = addUnitsToSvg(addEncoding(svg), units);

  fs.writeFile(path.resolve(file), svg, function (err) {
    if (err) throw err;
    console.log('Saved ' + file + ' ✔');
  });
};

exports.outputToHtml = function(file, svg, units) {
  svg = addUnitsToSvg(svg, units);

  var html = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>' + svg + '</body></html>';

  fs.writeFile(path.resolve(file), html, function (err) {
    if (err) throw err;
    console.log('Saved ' + file + ' ✔');
  });
};