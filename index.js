var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var closest = require('./drawing/closest.js');
var exponential = require('./drawing/exponential.js');
var hatch = require('./drawing/hatch.js');

var _ = require('lodash');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  new Path.Rectangle({
    from: [0, 0],
    to: view.bounds.bottomRight,
    style: pen.thin.grey
  });

  var myCirclesGroup = new Group([
    new Path.Circle({
      center: view.bounds.center,
      radius: view.bounds.width / 4
    }),
    new Path.Circle({
      center: view.bounds.center,
      radius: view.bounds.width / 4 - 7
    }),
    new Path.Circle({
      center: view.bounds.center,
      radius: view.bounds.width / 4 - 14
    })
  ]).style = pen.thick.lightBlue;

  var mySquare = new Path.Rectangle({
    from: view.bounds.center.subtract(view.bounds.width / 5),
    to: view.bounds.center.add(view.bounds.width / 5),
    style: pen.thick.pink
  });

  // console.log(mySquare);

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('ECLIPSE-2', svg, seed);
fileUtil.outputToHtml(svg);