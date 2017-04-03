var paper = require('paper');

var util = require('./util.js');
var a4 = require('./a4.js');

with (paper) {
  paper.setup(new Size(a4.portrait.x, a4.portrait.y));

  var rect = new Path.Rectangle({
        from: [0, 0],
        to: view.bounds.bottomRight,
        strokeColor: 'grey'
    });

  var circle = new Path.Circle({
    center: view.bounds.center,
    radius: 50,
    strokeColor: 'red'
  });

  var svg = project.exportSVG({asString: true, matchShapes: true});
      svg = util.addEncoding(svg);
      svg = util.addUnitsToSvg(svg, a4.units);

	var html = '<!doctype html><html lang="en"><head><meta charset="utf-8"></head><body>' + svg + '</body></html>';

  util.writeToFile('./svg/paperSVG.svg', svg);
  util.writeToFile('./index.html', html);
}