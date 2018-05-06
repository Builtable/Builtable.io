// Sass configuration
var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    gulp.src('sass/main.scss')
        .pipe(sass())
        // .pipe(gulp.dest(function(f) {
        //     return f.base;
        // }))
        .pipe(gulp.dest("css"))
});

gulp.task('default', ['sass'], function() {
    gulp.watch('*sass/main.scss', ['sass']);
})