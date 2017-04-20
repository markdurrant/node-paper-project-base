var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var closest = require('./drawing/closest.js');
var exponential = require('./drawing/exponential.js');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  var center = new Point(view.bounds.center.x, view.bounds.width / 2);
  var innerRadius = view.bounds.width / 7;
  var outerRadius = view.bounds.width / 2;

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

  var dashPoints = [];
  var dashLength = 2;
  var dashGroup1 = new Group();
  var dashGroup2 = new Group();


  var drawDash = function(point) {
    var angle = center.subtract(point).angle;
    var length = center.subtract(point).length;

    var p1 = pointFromVector(center, angle, length);
    var p2 = pointFromVector(center, angle, length + dashLength);

    var dash = new Path.Line({
      from: p1,
      to: p2,
      blendMode: 'multiply'
    });

    dash.rotate(Math.random() * 30 - 15);

    if (Math.random() < 0.5) {
      dashGroup1.addChild(dash);
    } else {
      dashGroup2.addChild(dash);
    }

    dashPoints.push(point);
  };

  for(var i = 0; i < 2500; i++) {
    drawDash(bestCandidate(dashPoints, 5));
  }

  dashGroup1.style = pen.thick.black;
  dashGroup2.style = pen.thick.lightBlue;
  // dashGroup2.blendMode = 'multiply';

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('WAVE', svg, seed);
fileUtil.outputToHtml(svg);