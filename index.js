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

  var diaGroup = new Group();

  var size = view.bounds.width - 30;

  var diaCenter = view.bounds.center.add([0, - 42]);

  var diamond = new Path({
    segments: [
      diaCenter.add([0, size / 2]),
      diaCenter.add([- size / 2, 0]),
      diaCenter.add([0, - size / 2]),
      diaCenter.add([size / 2, 0])
    ],
    closed: true,
    style: pen.thick.grey
  });

  diaGroup.addChild(diamond);

  var rotation = 5;
  var itterations = 40;

  for (var i = 1; i < itterations; i++) {
    diaGroup.addChild(
      diamond
        .clone()
        .scale(1 - i * 1 / itterations)
        .rotate(rotation * i)
        .smooth({type: 'geometric', factor: i * 1 / itterations})
    );
  }

  diaGroup.clone().scale(-1, 1).style = pen.thin.lightBlue;

  var svg = project.exportSVG({asString: true, matchShapes: true});

  fUil.outputToSvg('./svg/paperSVG.svg', svg, a4.units);
  fUil.outputToHtml('./index.html', svg, a4.units);
}