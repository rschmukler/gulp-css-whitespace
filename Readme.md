# gulp-css-whitespace

Gulp plugin for [css-whitespace](https://github.com/reworkcss/css-whitespace).

## Example

```js
  var gulp = require('gulp'),
      whitespace = require('gulp-css-whitespace');

  gulp.task('whitespace', function() {
    return gulp.src('./src/whitespace.styl')
            .pipe(whitespace())
            .pipe(gulp.dest('build'));
  });

  gulp.task('default', function() {
    gulp.run('whitespace');
  });
```

## Options

#### replaceExtension (file)

Replaces the extension of the file in question. For example, convertig `styl` to `css`.

```js
return gulp.src('./src/whitespace.styl')
        .pipe(whitespace({replaceExtension: '.css'}))
        .pipe(gulp.dest('build'));
```
