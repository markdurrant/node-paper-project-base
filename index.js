var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var intersect = require('./drawing/lineIntersect.js');
var cutOut = require('./drawing/lineCutOut.js');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight,
    style: pen.thin.grey
  });

  var mySquare = new Path.Rectangle({
    from: view.bounds.center.subtract(view.bounds.width / 5),
    to: view.bounds.center.add(view.bounds.width / 5),
    style: pen.thin.lightGrey
  });

  var myLine = new Path.Line({
    from: view.bounds.center.subtract([0, 100]),
    to: view.bounds.center.add([0, 100]),
    style: pen.thin.cyan
  });

  myLine.rotate(45, view.bounds.center);

  cutOut(myLine, mySquare);

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('ECLIPSE-2', svg, seed);
fileUtil.outputToHtml(svg);