var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var seed = seedUtil.getSeed(process.argv[2]);

// -----------------------------------------------------------------------------

with (paper) {
  paper.setup(new Size(page.x, page.y));

  var cont = new Path.Rectangle({
    point: new Point(40, 40),
    size: new Size(40, 70),
    fillColor: '#eee'
  });

  var hatch = function(topLeft, width, height, spacing, offset, style) {
    var xI = width / spacing;
    var yI = height / spacing;

    for(var l = 0; l < (width + height) / spacing; l++) {
      var x1 = Math.max(0, l - yI) * spacing;
      var y1 = ((l < yI) ? l : yI) * spacing;
      var x2 = ((l < xI) ? l : xI) * spacing;
      var y2 = Math.max(0, l - xI) * spacing;

      var line = new Path.Line({
        from: new Point(x1, y1).add(topLeft),
        to: new Point(x2, y2).add(topLeft),
        style: style
      });
    }
  };

  hatch(cont.point, cont.size.width, cont.size.height, 1.5, 2, pen.thin.lightBlue);

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('WAVE', svg, seed);
fileUtil.outputToHtml(svg);