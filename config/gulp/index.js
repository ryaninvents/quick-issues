import gulp from 'gulp';
import babel from 'gulp-babel';
import watch from 'gulp-watch';
import plumber from 'gulp-plumber';
import gutil from 'gulp-util';

const SOURCES = ['src/**/*.js'];
const DESTINATION = './lib';

gulp.task('transpile', () =>
  gulp.src(SOURCES)
    .pipe(babel())
    .pipe(gulp.dest(DESTINATION))
);

gulp.task('transpile:watch', ['transpile'], () =>
  watch(SOURCES)
    .on('data', (file) => gutil.log(
      `[${gutil.colors.green('transpile:watch')}]`,
      `Transpiling ${gutil.colors.bold.cyan(file.relative)}...`
      ))
    .pipe(plumber())
    .pipe(babel())
    .on('data', (file) => gutil.log(
      `[${gutil.colors.green('transpile:watch')}]`,
      `Finished transpiling ${gutil.colors.bold.cyan(file.relative)}.`
    ))
    .pipe(gulp.dest(DESTINATION))
);
