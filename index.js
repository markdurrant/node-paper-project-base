var paper = require('paper');
var _ = require('lodash');
var seed = require('seed-random');

var fUil = require('./fileUtils.js');
var pUtil = require('./paperUtils.js');

var page = require('./page.js');
var pen = require('./pens.js');

var mySeed = '';

if(process.argv[2]) {
  mySeed = process.argv[2];
} else {
  var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  for (var s = 0; s < 10; s++) {
    mySeed = mySeed + chars.charAt(Math.random() * chars.length);
  }
}

var now = new Date();
var dateStr = now.getFullYear() + '-' + now.getDate() + '-' + now.getHours() + '-' + now.getMinutes() + '-' + now.getSeconds();

seed(mySeed, {global: true});

with (paper) {
  paper.setup(new Size(page.portrait.x, page.portrait.y));

  var border = new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight,
    strokeColor: 'grey'
  });

  for (var i = 0; i < 10; i++) {
    new Path.Circle({
      radius: 2,
      x: Math.random() * view.bounds.width,
      y: Math.random() * view.bounds.height,
      style: pen.thin.orange
    });
  }

  var svg = project.exportSVG({asString: true, matchShapes: true});

  fUil.outputToSvg('./svg/' + mySeed + '-' + dateStr + '.svg', svg, page.units);
  fUil.outputToHtml('./index.html', svg, page.units);
}