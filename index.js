var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var getRandomPoint = require('./drawing/randomPoint.js');

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
    sites.push(getRandomPoint(topLeft, bottomRight));
  }

  var diagram = voronoi.compute(sites, bbox);

  console.log(diagram.edges);

  diagram.vertices.forEach(function(vertice) {
    new Path.Circle({
      center: new Point(vertice.x, vertice.y),
      radius: 1,
      style: pen.thick.orange
    });
  });

  diagram.edges.forEach(function(edge) {
    new Path.Line({
      from: new Point(edge.va.x, edge.va.y),
      to: new Point(edge.vb.x, edge.vb.y),
      style: pen.thick.lightBlue
    });
  });

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('ECLIPSE-2', svg, seed);
fileUtil.outputToHtml(svg);