var gulp = require('gulp')
var mocha = require('gulp-mocha')
var tests = './test'

/*
* Run tests.
*/
gulp.task('test', function () {
  return gulp.src(tests + '/*Test.js', { read: false })
    .pipe(mocha())
    .once('end', process.exit)
})
