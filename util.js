var path = require('path');
var fs = require('fs');

exports.writeToFile = function (file, content) {
  fs.writeFile(path.resolve(file), content, function (err) {
    if (err) throw err;
    console.log('Saved ' + file + ' ✔');
  });
}

exports.addUnitsToSvg = function(svg, units) {
  var rx = /width="([0-9]+)" height="([0-9]+)"/;

  var attr = 'width="' + svg.match(rx)[1] + units +
            '" height="' + svg.match(rx)[2] + units +
            '" viewbox="0 0 ' + svg.match(rx)[1] + ' ' + svg.match(rx)[2] + '"';

  svg = svg.replace(rx, attr);

  return svg;
}