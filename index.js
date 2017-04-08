var paper = require('paper');
var _ = require('lodash');

var fUil = require('./fileUtils.js');
var pUtil = require('./paperUtils.js');
var a4 = require('./a4.js');

var pen = require('./pens.js');

console.log(pen.thick.red);
console.log(pen.thin.red);

with (paper) {
  paper.setup(new Size(a4.portrait.x, a4.portrait.y));

  var border = new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight,
    strokeColor: 'grey'
  });

  var gold = (1 + Math.sqrt(5)) / 2;

  var from = new Point(view.bounds.width / gold / 4, view.bounds.height / gold / 4);
  var to = new Point(view.bounds.width / gold / 2 + view.bounds.width / gold / 4, view.bounds.height / gold / 2 + view.bounds.height / gold / 4);

  var dotArray = [];

  for(var i = 0; i < 10; i++) {
    dotArray.push(pUtil.getBestCandidateRandom(dotArray, 1, from, to));
  }

  dotArray = _.sortBy(dotArray, ['y']);

  new Layer();

  dotArray.forEach(function(point){
    new Path.Line({
      from: point,
      to: point.add([0.1, 0]),
      strokeWith: 1.5,
      strokeColor: '#09f',
      strokeCap: 'round'
    });
  });

  var svg = project.exportSVG({asString: true, matchShapes: true});

  fUil.outputToSvg('./svg/paperSVG.svg', svg, a4.units);
  fUil.outputToHtml('./index.html', svg, a4.units);
}