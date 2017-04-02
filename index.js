var paper = require('paper');
var path = require('path');
var fs = require('fs');

function writeToFile(file, content) {
	fs.writeFile(path.resolve(file), content, function (err) {
    if (err) throw err;
    console.log('Saved ' + file + ' ✔');
  });
}

with (paper) {
  paper.setup(new Size(300, 600));

  var svg = project.exportSVG({ asString: true });
	var html = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>' + svg + '</body></html>';

  writeToFile('./output/out.svg', svg);
  writeToFile('./index.html', html);
}