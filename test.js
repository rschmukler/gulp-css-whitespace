'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var whitespace = require('./');

it('should work', function (cb) {
  var input  = 'body\n  color:#fff\n  font-weight: 400';
  var output = 'body {\n  color: #fff;\n  font-weight: 400;\n}';

  var stream = whitespace();

  stream.on('data', function (data) {
    assert.equal(data.contents.toString(), output);
    cb();
  });

  stream.write(new gutil.File({
    contents: new Buffer(input)
  }));
});

it('should work with trailing { } ;', function (cb) {
  var input  = 'body {\n  color:#fff\n  font-weight: 400;\n}';
  var output = 'body {\n  color: #fff;\n  font-weight: 400;\n}';

  var stream = whitespace();

  stream.on('data', function (data) {
    assert.equal(data.contents.toString(), output);
    cb();
  });

  stream.write(new gutil.File({
    contents: new Buffer(input)
  }));
});

it('should replace extension', function (cb) {
  var input  = '/path/to/file.styl';
  var output = '/path/to/file.css';

  var stream = whitespace({replaceExtension: '.css'});

  stream.on('data', function (data) {
    assert.equal(data.path, output);
    cb();
  });

  stream.write(new gutil.File({
    path: input,
    contents: new Buffer('')
  }));
});

it('should throw error with useful params', function (cb) {
  var path = '/path/to/file.css';

  var stream = whitespace();

  stream.on('error', function (err) {
    assert.equal(err instanceof Error, true, 'instanceof Error');
    assert.equal(err.message, "Object font-weight has no method 'join'");
    assert.equal(err.fileName, path);
    assert.equal(err.plugin, 'gulp-css-whitespace');
    cb();
  });

  stream.write(new gutil.File({
    path: path,
    contents: new Buffer('body\n  color:#fff\n    font-weight: 400')
  }));
});