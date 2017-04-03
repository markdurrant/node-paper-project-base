var path = require('path');
var fs = require('fs');

exports.writeToFile = function (file, content) {
  fs.writeFile(path.resolve(file), content, function (err) {
    if (err) throw err;
    console.log('Saved ' + file + ' ✔');
  });
}