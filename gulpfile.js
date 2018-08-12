var gulp          = require('gulp'),
    gutil         = require('gulp-util' ),
    sass          = require('gulp-sass'),
    browserSync   = require('browser-sync'),
    concat        = require('gulp-concat'),
    uglify        = require('gulp-uglify'),
    cleancss      = require('gulp-clean-css'),
    rename        = require('gulp-rename'),
    autoprefixer  = require('gulp-autoprefixer'),
    notify        = require("gulp-notify");

gulp.task('browser-sync', function() {
    browserSync({
        proxy: 'kohana.l',
        notify: false,
    })
});

gulp.task('styles', function() {
    return gulp.src('application/assets/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expand' }).on("error", notify.onError()))
        .pipe(rename({ suffix: '.min', prefix : '' }))
        .pipe(autoprefixer(['last 15 versions']))
        .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
        .pipe(gulp.dest('application/media/css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('js', function() {
    return gulp.src([
        // 'app/libs/jquery/dist/jquery.min.js',
        // 'app/js/bootstrap.bundle.min.js',
        // 'app/js/bootstrap.min.js',
        'application/assets/js/common.js', // Always at the end
    ])
        .pipe(concat('main.min.js'))
        .pipe(uglify()) // Mifify js (opt.)
        .pipe(gulp.dest('application/media/js'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', ['styles', 'js', 'browser-sync'], function() {
    gulp.watch('application/assets/scss/**/*.scss', ['styles']);
    gulp.watch(['application/assets/**/*.js'], ['js']);
    gulp.watch('application/**/*.php', browserSync.reload)
});

gulp.task('default', ['watch']);