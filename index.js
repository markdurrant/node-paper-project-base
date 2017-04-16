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
    top: 73.5,
    left: 60,
    columns: 18,
    rows: 30,
    cellWidth: 5,
    cellHeight: 5,
    style: pen.thin.cyan
  };

  drawGrid(grid);

  var wavePoints = [];

  for(var i = 0; i < 12 ; i++) {
    wavePoints.push(bestCandidate(
      wavePoints,
      15,
      new Point(grid.left + 5, grid.top + grid.rows * grid.cellHeight),
      new Point(grid.left + grid.columns * grid.cellWidth - 5, grid.top + grid.rows * grid.cellHeight)
    ));
  }

  wavePoints.push(
    new Point(grid.left, grid.top + grid.rows * grid.cellHeight),
    new Point(grid.left + grid.columns * grid.cellWidth, grid.top + grid.rows * grid.cellHeight)
  );

  orderPoints.byX(wavePoints);

  var waveLine = new Path({
    segments: wavePoints,
    style: pen.thick.black
  });

  waveLine.smooth({type: 'geometric', factor: 0.4});
  // waveLine.smooth();

  var moveUpAndWobble = function(segment) {
    segment.point.y = segment.point.y - Math.random() * 2.5 - i * 0.35;
  };

  for (var i = 0; i < 26; i ++) {
    var copy = project.activeLayer.lastChild.clone();

    copy.segments.forEach(moveUpAndWobble);
  }

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('WAVE', svg, seed);
fileUtil.outputToHtml(svg);