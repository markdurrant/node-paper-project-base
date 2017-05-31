var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var bestCandidate = require('./drawing/bestCandidate.js');

var Voronoi = require('voronoi');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  var pageOutline = new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight
  });

  var topLeft = new Point(20, 20);
  var bottomRight = new Point(view.bounds.width - 20, view.bounds.height - 20);

  var voronoi = new Voronoi();

  var bbox = {xl: topLeft.x, xr: bottomRight.x, yt: topLeft.y, yb: bottomRight.y};

  var sites = [];

  for (var p = 0; p < 100; p++) {
    sites.push(bestCandidate(sites, 2, topLeft, bottomRight));
  }

  var diagram = voronoi.compute(sites, bbox);

  diagram.cells.forEach(function(cell) {
    var cellPath = new Path({
      style: pen.thick.pink,
      closed: true
    });

    cell.halfedges.forEach(function(he) {
      cellPath.addSegment(he.getEndpoint());
    });
  });

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('ECLIPSE-2', svg, seed);
fileUtil.outputToHtml(svg);