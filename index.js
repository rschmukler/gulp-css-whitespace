var gutil = require('gulp-util');
var through = require('through2');
var whitespace = require('css-whitespace');

module.exports = function(opts) {
  opts = opts || {};

  return through.obj(function (file, enc, cb) {
    if (file.isNull()) {
      this.push(file);
      return cb();
    }

    if (file.isStream()) {
      this.emit('error', new gutil.PluginError('gulp-css-whitespace', 'Streaming not supported'));
      return cb();
    }

    if(opts.replaceExtension) {
      file.path = gutil.replaceExtension(file.path, opts.replaceExtension);
    }

    try {
      var str = file.contents.toString();
      str = whitespace(str.replace(/\s*[{};]+\s*$/gm, ''));
      file.contents = new Buffer(str);
    } catch (err) {
      err.fileName = file.path;
      this.emit('error', new gutil.PluginError('gulp-css-whitespace', err));
    }

    this.push(file);
    cb();
  });
};
