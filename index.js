var paper = require('paper');

var util = require('./util.js');
var a4 = require('./a4.js');

with (paper) {
  paper.setup(new Size(a4.portrait.x, a4.portrait.y));

  var svg = project.exportSVG({ asString: true });

  svg = util.addUnitsToSvg(svg, a4.units);

	var html = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>' + svg + '</body></html>';

  util.writeToFile('./output/out.svg', svg);
  util.writeToFile('./index.html', html);
}