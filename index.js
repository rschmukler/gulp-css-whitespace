var mapStream = require('map-stream'),
    gutil = require('gulp-util'),
    whitespace = require('css-whitespace');

module.exports = function(opts) {
  opts = opts || {};
  function convertWhitespace(file, cb) {
    if(opts.replaceExtension) {
      file.path = gutil.replaceExtension(file.path, opts.replaceExtension);
    }
    try {
      file.contents = new Buffer(whitespace(file.contents.toString()));
      cb(null, file);
    } catch (err){
      cb(err, file);
    }
  }
  return mapStream(convertWhitespace);
};
