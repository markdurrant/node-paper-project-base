var seedRandom = require('seed-random');

exports.getSeed = function(seedArg) {
  var seed = '';

  if(seedArg) {
    seed = seedArg;
  } else {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var s = 0; s < 10; s++) {
      seed = seed + chars.charAt(Math.random() * chars.length);
    }
  }

  seedRandom(seed, {global: true});

  return seed;
};