var paper = require('paper');
var _ = require('lodash');

var fUil = require('./fileUtils.js');
var pUtil = require('./paperUtils.js');
var a4 = require('./a4.js');

var pen = require('./pens.js');

with (paper) {
  paper.setup(new Size(a4.portrait.x, a4.portrait.y));

  var border = new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight,
    strokeColor: 'grey'
  });

  var svg = project.exportSVG({asString: true, matchShapes: true});

  fUil.outputToSvg('./svg/paperSVG.svg', svg, a4.units);
  fUil.outputToHtml('./index.html', svg, a4.units);
}