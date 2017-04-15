var paper = require('paper');

// var g = {
//   top: 40,
//   left: 60
//   columns: 9,
//   rows: 15,
//   cellWidth: 10,
//   cellHeight: 10,
//   style: pen.thin.cyan,
//   border: true
// };

module.exports = function(g) {with(paper){
  var top = g.top;
  var left = g.left;
  var bottom = top + g.rows * g.cellHeight;
  var right = left + g.columns * g.cellWidth;

  for(var c = 1; c < g.columns; c++){
    new Path.Line({
      from:  new Point([c * g.cellWidth + left, top]),
      to: new Point([c * g.cellWidth + left, bottom]),
      style: g.style
    });
  }

  for(var r = 1; r < g.rows; r++) {
    new Path.Line({
      from:  new Point([left, r * g.cellHeight + top]),
      to: new Point([right, r * g.cellHeight + top]),
      style: g.style
    });
  }

  if (g.border === true || g.border === undefined) {
    new Path.Rectangle({
      from: new Point([left, top]),
      to: new Point([right, bottom]),
      style: g.style
    });
  }
}};