// adapted from https://github.com/bramp/prob.js
module.exports = function(lambda){
  lambda = typeof lambda !== 'undefined' ? lambda : 10.0;
  var mean = 1 / lambda;

  return -1 * Math.log(Math.random()) * mean;
};