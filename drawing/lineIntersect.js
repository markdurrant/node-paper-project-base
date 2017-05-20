var paper = require('paper');

module.exports = function(line, shape) {
  var intersects = line.getIntersections(shape);

  if (intersects.length) {
    line.add(intersects[0].point);
  }

  if (intersects.length === 2) {
    line.add(intersects[1].point);
    line.removeSegment(0);
    line.removeSegment(0);
  } else if (intersects.length && shape.contains(line.segments[0].point)) {
    line.removeSegment(1);
  } else if (intersects.length &&  shape.contains(line.segments[1].point)) {
    line.removeSegment(0);
  }
};