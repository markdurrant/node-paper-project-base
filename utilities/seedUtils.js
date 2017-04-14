var seed = require('seed-random');

exports.getSeed = function(seedArg) {
  var mySeed = '';

  if(seedArg) {
    mySeed = seedArg;
  } else {
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var s = 0; s < 10; s++) {
      mySeed = mySeed + chars.charAt(Math.random() * chars.length);
    }
  }

  seed(mySeed, {global: true});

  return mySeed;
}