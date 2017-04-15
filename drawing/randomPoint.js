var paper = require('paper');

module.exports = function(topLeft, bottomRight) {with(paper){
  return new Point(
    Math.random() * ( bottomRight.x - topLeft.x + 1 ) + topLeft.x,
    Math.random() * ( bottomRight.y - topLeft.y + 1 ) + topLeft.y
  );
}};