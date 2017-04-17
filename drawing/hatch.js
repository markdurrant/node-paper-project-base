var paper = require('paper');

// direction = n, e, s, w, nE, sE, sW, nW
module.exports = function(direction, topLeft, width, height, spacing, style) {with(paper){
  var drawLine = function(x1, y1, x2, y2) {
    new Path.Line({
      from: new Point(x1, y1).add(topLeft),
      to: new Point(x2, y2).add(topLeft),
      style: style
    });
  };

  var w = width / spacing;
  var h = height / spacing;

  var getX1, getY1, getX2, getY2;

  switch(direction) {
    case 'n': case 's':
      height = 0;
      getX1 = function() {return l * spacing;};
      getY1 = function() {return 0;};
      getX2 = function() {return l * spacing;};
      getY2 = function() {return h * spacing;};
    break; case 'e': case 'w':
      width = 0;
      getX1 = function() {return 0;};
      getY1 = function() {return l * spacing;};
      getX2 = function() {return w * spacing;};
      getY2 = function() {return l * spacing;};
    break; case 'nE': case 'sW':
      getX1 = function() {return ((l - h < 0) ? 0 : l - h) * spacing;};
      getY1 = function() {return ((l < h) ? l : h) * spacing;};
      getX2 = function() {return ((l < w) ? l : w) * spacing;};
      getY2 = function() {return ((l - w < 0) ? 0 : l - w) * spacing;};
    break; case 'nW': case 'sE':
      getX1 = function() {return ((l < w) ? l : w) * spacing;};
      getY1 = function() {return ((l <= w) ? h : w + h - l) * spacing;};
      getX2 = function() {return ((l < h) ? 0 : l - h) * spacing;};
      getY2 = function() {return ((h - l < 0) ? 0 : h - l) * spacing;};
    break;
  }

  for(var l = 0; l <= (width + height) / spacing; l++) {
    var x1 = getX1();
    var y1 = getY1();
    var x2 = getX2();
    var y2 = getY2();

    drawLine(x1, y1, x2, y2);
  }
}};