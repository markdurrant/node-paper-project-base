var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

// var bestCandidate = require('./drawing/bestCandidate.js');
//
var closest = require('./drawing/closest.js');
var exponential = require('./drawing/exponential.js');

var Voronoi = require('voronoi');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  var pageOutline = new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight
  });

  var center = view.bounds.center;
  var innerRadius = view.bounds.width / 10;
  var outerRadius = view.bounds.width / 2;

  var myPoints = [];

  var pointFromVector = function(origin, angle, length) {
    angle = angle * Math.PI / 180;

    var x = origin.x + Math.cos(angle) * length;
    var y = origin.y + Math.sin(angle) * length;

    return new Point(x, y);
  };

  var bestCandidate = function(pointArray, itterations) {
    var randomPoint;
    var exp = exponential(2.5);

    if (pointArray.length === 0) {
      randomPoint = pointFromVector(center, Math.random() * 360, exp * (outerRadius - innerRadius) + innerRadius);
    } else {
      var bestCandidate, bestDistance = 0;

      for(var i = 0; i < itterations; i++) {
        var candidate = pointFromVector(center, Math.random() * 360, exp * (outerRadius - innerRadius) + innerRadius);
        var distance = candidate.getDistance(closest(candidate, pointArray));

        if (distance > bestDistance) {
          bestDistance = distance;
          bestCandidate = candidate;
        }
      }

      randomPoint = bestCandidate;
    }

    return randomPoint;
  };

  for(var i = 0; i < 5000; i++) {
    myPoints.push(bestCandidate(myPoints, 5));
  }

  var topLeft = new Point(30, 30);
  var bottomRight = new Point(view.bounds.width - 30, view.bounds.height - 30);

  var voronoi = new Voronoi();

  var bbox = {xl: topLeft.x, xr: bottomRight.x, yt: topLeft.y, yb: bottomRight.y};

  var diagram = voronoi.compute(myPoints, bbox);

  diagram.cells.forEach(function(cell) {
    var cellPath = new Path({
      style: pen.thin.lightBlue,
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