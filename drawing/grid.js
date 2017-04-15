var paper = require('paper');

// var grid = {
//   top: 40,
//   left: 60,
//   columns: 9,
//   rows: 15,
//   cellWidth: 10,
//   cellHeight: 10,
//   style: pen.thin.cyan,
//   border: true
// };

module.exports = function(grid) {with(paper){
  var top = grid.top;
  var left = grid.left;
  var bottom = top + grid.rows * grid.cellHeight;
  var right = left + grid.columns * grid.cellWidth;

  for(var c = 1; c < grid.columns; c++){
    new Path.Line({
      from:  new Point([c * grid.cellWidth + left, top]),
      to: new Point([c * grid.cellWidth + left, bottom]),
      style: grid.style
    });
  }

  for(var r = 1; r < grid.rows; r++) {
    new Path.Line({
      from:  new Point([left, r * grid.cellHeight + top]),
      to: new Point([right, r * grid.cellHeight + top]),
      style: grid.style
    });
  }

  if (grid.border === true || grid.border === undefined) {
    new Path.Rectangle({
      from: new Point([left, top]),
      to: new Point([right, bottom]),
      style: grid.style
    });
  }
}};