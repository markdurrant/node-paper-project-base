var paper = require('paper');
var getRandomPoint = require('./randomPoint.js');
var getClosest = require('./closest.js');

module.exports = function(pointArray, itterations, topLeft, bottomRight) {with(paper){
  var randomPoint;

  if (pointArray[0] === undefined) {
    randomPoint = getRandomPoint(topLeft, bottomRight);
  } else {
    var bestCandidate, bestDistance = 0;

    for(var i = 0; i < itterations; i++) {
      var candidate = getRandomPoint(topLeft, bottomRight),
          distance = candidate.getDistance(getClosest(candidate, pointArray));

      if (distance > bestDistance) {
        bestDistance = distance;
        bestCandidate = candidate;
      }
    }

    randomPoint = bestCandidate;
  }

  return randomPoint;
}};