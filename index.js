var paper = require('paper');

var fileUtil = require('./utilities/fileUtils.js');
var paperUtil = require('./utilities/paperUtils.js');
var svgUtil = require('./utilities/svgUtils.js');
var seedUtil = require('./utilities/seedUtils.js');

var page = require('./config/pageConfig.js');
var pen = require('./config/pensConfig.js');

var seed = seedUtil.getSeed(process.argv[2]);

with (paper) {
  paper.setup(new Size(page.portrait.x, page.portrait.y));

  for (var i = 0; i < 10; i++) {
    new Path.Circle({
      radius: 2,
      x: Math.random() * view.bounds.width,
      y: Math.random() * view.bounds.height,
      style: pen.thin.orange
    });
  }

  var svg = project.exportSVG({asString: true, matchShapes: true});
      svg = svgUtil.addEncoding(svgUtil.addUnits(svg, page.units));

  fileUtil.outputToSvg('test', svg, seed);
  fileUtil.outputToHtml(svg);
}