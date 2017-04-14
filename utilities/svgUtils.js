exports.addUnits = function(svg, units) {
  var regEx = /width="([0-9]+)" height="([0-9]+)"/;

  var attr = 'width="' + svg.match(regEx)[1] + units +
            '" height="' + svg.match(regEx)[2] + units +
            '" viewbox="0 0 ' + svg.match(regEx)[1] + ' ' + svg.match(regEx)[2] + '"';

  return svg.replace(regEx, attr);
};

exports.addEncoding = function(svg) {
  return '<?xml version="1.0" encoding="utf-8"?>' + svg;
};