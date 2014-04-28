var map = require('map-stream'),
    gutil = require('gulp-util'),
    whitespace = require('css-whitespace');

module.exports = function(opts) {
  opts = opts || {};
  return map(function (file, cb) {
    if(opts.replaceExtension) {
      file.path = gutil.replaceExtension(file.path, opts.replaceExtension);
    }
    try {
      var str = file.contents.toString();
      str = whitespace(str.replace(/\s*[{};]+\s*$/gm, ''));
      file.contents = new Buffer(str);
      cb(null, file);
    } catch (err){
      cb(err, file);
    }
  });
};
