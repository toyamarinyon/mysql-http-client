import gulp from 'gulp'
import babel from 'gulp-babel'
// import notify from 'gulp-notify'

gulp.task('babel', () => {
  gulp
    .src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/'))
})

gulp.task('watch', () => gulp.watch(['src/**/*.js'], ['babel']))
gulp.task('default', ['babel', 'watch'])
