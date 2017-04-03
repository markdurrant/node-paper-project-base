var paper = require('paper');

var fu = require('./fileUtil.js');
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

  fu.outputToSvg('./svg/paperSVG.svg', svg, a4.units);
  fu.outputToHtml('./index.html', svg);
}