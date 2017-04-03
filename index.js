var paper = require('paper');

var fUil = require('./fileUtils.js');
var pUtil = require('./paperUtils.js');
var a4 = require('./a4.js');

with (paper) {
  paper.setup(new Size(a4.portrait.x, a4.portrait.y));

  var border = new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight,
    strokeColor: 'grey'
  });

  var dotArray = [];

  for(var i = 0; i < 500; i++) {
    dotArray.push(pUtil.getBestCandidateRandom(dotArray, 100, view.bounds.topLeft, view.bounds.bottomRight));
  }

  dotArray.forEach(function(point) {
    new Path.Circle({
      center: point,
      radius: 1,
      strokeColor: 'blue'
    });
  });

  var svg = project.exportSVG({asString: true, matchShapes: true});

  fUil.outputToSvg('./svg/paperSVG.svg', svg, a4.units);
  fUil.outputToHtml('./index.html', svg);
}