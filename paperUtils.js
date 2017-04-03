var paper = require('paper');

with (paper) {
  var getRandomPoint = function(min, max) {
    return new Point(
      Math.random() * ( max.x - min.x + 1 ) + min.x,
      Math.random() * ( max.y - min.y + 1 ) + min.y
    );
  };

  var getClosest = function(array, point) {
    var closest = array[0];

    array.forEach(function(arrayPoint) {
      if (point.getDistance(arrayPoint) < point.getDistance(closest)) {
        closest = arrayPoint;
      }
    });

    return closest;
  };

  var getBestCandidateRandom = function(array, itterations, boundX, boundY) {
    var randomPoint;

    if (array[0] === undefined) {
      randomPoint = getRandomPoint(boundX, boundY);
    } else {
      var bestCandidate, bestDistance = 0;

      for(var i = 0; i < itterations; i++) {
        var candidate = getRandomPoint(boundX, boundY),
            distance = candidate.getDistance(getClosest(array, candidate));

        if (distance > bestDistance) {
          bestDistance = distance;
          bestCandidate = candidate;
        }
      }

      randomPoint = bestCandidate;
    }

    return randomPoint;
  };
}

module.exports = {
  getRandPoint: getRandomPoint,
  getClosest: getClosest,
  getBestCandidateRandom: getBestCandidateRandom
};