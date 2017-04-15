var paper = require('paper');

exports.byX = function(pointArray) {with(paper){
  pointArray.sort(function(a, b){
    return a.x - b.x;
  });

  return pointArray;
}};

exports.byY = function(pointArray) {with(paper){
  pointArray.sort(function(a, b){
    return a.y - b.y;
  });

  return pointArray;
}};