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
    size: new Size(50, 100),
    fillColor: '#eee'
  });

  var hatch = function(topLeft, width, height, spacing, style) {
    var w = width / spacing;
    var h = height / spacing;

    for(var l = 0; l <= (width + height) / spacing; l++) {
      var x1 = ((l - h < 0) ? 0 : l - h) * spacing;
      var y1 = ((l < h) ? l : h) * spacing;
      var x2 = ((l < w) ? l : w) * spacing;
      var y2 = ((l - w < 0) ? 0 : l - w) * spacing;

      var line = new Path.Line({
        from: new Point(x1, y1).add(topLeft),
        to: new Point(x2, y2).add(topLeft),
        style: style
      });
    }
  };

  // var hatch = function(topLeft, width, height, spacing, style) {
  //   var w = width / spacing;
  //   var h = height / spacing;

  //   for(var l = 0; l <= (width + height) / spacing; l++) {
  //     var x1 = ((l < w) ? l : w) * spacing;
  //     var y1 = ((l <= w) ? h : w + h - l) * spacing;
  //     var x2 = ((l < h) ? 0 : l - h) * spacing;
  //     var y2 = ((h - l < 0) ? 0 : h - l) * spacing;

  //     console.log(l + ': X1: ' + x1 + ' |  Y1: ' + y1 + ' ||| X2: ' + x2 + ' |  Y2: ' + y2);

  //     var line = new Path.Line({
  //       from: new Point(x1, y1).add(topLeft),
  //       to: new Point(x2, y2).add(topLeft),
  //       style: style
  //     });
  //   }
  // };

  hatch(cont.point, cont.size.width, cont.size.height, 2, pen.thin.orange);

  var svg = project.exportSVG({asString: true});
}

// -----------------------------------------------------------------------------

svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

fileUtil.outputToSvg('WAVE', svg, seed);
fileUtil.outputToHtml(svg);