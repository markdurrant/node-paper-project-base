var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var drawGrid = require('./drawing/grid.js');
var bestCandidate = require('./drawing/bestCandidate.js');
var orderPoints = require('./drawing/orderPoints.js');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  var grid = {
    top: 40,
    left: 60,
    columns: 9,
    rows: 15,
    cellWidth: 10,
    cellHeight: 10,
    style: pen.thin.cyan
  };

  drawGrid(grid);

  var wavePoints = [];

  for(var i = 0; i < 5; i++) {
    wavePoints.push(bestCandidate(
      wavePoints,
      15,
      new Point(grid.left, grid.top + grid.rows * grid.cellHeight),
      new Point(grid.left + grid.columns * grid.cellWidth, grid.top + grid.rows * grid.cellHeight)
    ));
  }

  wavePoints.forEach(function(p) {
    p.y = p.y + Math.random() * -2 + 1;
  });

  wavePoints.push(
    new Point(grid.left, grid.top + grid.rows * grid.cellHeight),
    new Point(grid.left + grid.columns * grid.cellWidth, grid.top + grid.rows * grid.cellHeight)
  );

  orderPoints.byX(wavePoints);

  var waveLine = new Path({
    segments: wavePoints,
    style: pen.thick.pink
  });

  waveLine.smooth({type: 'catmull-rom'});

  for (var i = 0; i < 50; i ++) {
    var copy = waveLine.clone();

    copy.segments.forEach(function(s){
      s.point.y = s.point.y + Math.random() * -2;
    });

    copy.position.y = copy.position.y - i * 3;
  }

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('test', svg, seed);
fileUtil.outputToHtml(svg);