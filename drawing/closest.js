var paper = require('paper');

module.exports = function(point, pointArray) {with(paper){
  var closest = pointArray[0];

  pointArray.forEach(function(arrayPoint) {
    if (point.getDistance(arrayPoint) < point.getDistance(closest)) {
      closest = arrayPoint;
    }
  });

  return closest;
}};