var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var drawGrid = require('./drawing/grid.js');

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

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('test', svg, seed);
fileUtil.outputToHtml(svg);