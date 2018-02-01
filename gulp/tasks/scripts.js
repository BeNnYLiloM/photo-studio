module.exports = function() {
    let libs = [
        'dev/libs/jquery/dist/jquery.min.js',
        'dev/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
        'dev/libs/slick-carousel/slick/slick.min.js',
        'dev/libs/svg4everybody/dist/svg4everybody.min.js',
        'dev/libs/mixitup-3/dist/mixitup.min.js',
        'dev/libs/jquery-ui/jquery-ui.min.js',
    ];

    $.gulp.task('libsJS:dev', () => {
        return $.gulp.src(libs)
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });

    $.gulp.task('libsJS:build', () => {
        return $.gulp.src(libs)
            .pipe($.gp.concat('libs.min.js'))
            .pipe($.gp.uglifyjs())
            .pipe($.gulp.dest('./build/static/js/'));
    });

    $.gulp.task('js:copy', () => {
        return $.gulp.src(['./dev/static/js/*.js',
                           '!./dev/static/js/libs.min.js'])
            .pipe($.gulp.dest('./build/static/js/'))
            .pipe($.browserSync.reload({
                stream: true
            }));
    });
};
