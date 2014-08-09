var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    karma = require('gulp-karma'),
    package = require('./package.json'),
    paths = {
        scripts: {
            src: 'src/' + package.name + '.js',
            dist: 'dist/' + package.name + '.js'
        },
        test: 'test/spec/' + package.name + '.spec.js',
        output: 'dist/'
    };

gulp.task('lint', function(){
    return gulp.src(paths.scripts.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
});

gulp.task('minify', ['test'], function(){
    return gulp.src(paths.scripts.dist)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.output));
});

gulp.task('test', ['lint'], function(){
    return gulp.src([paths.scripts.src, paths.test])
        .pipe(plumber())
        .pipe(karma({ configFile: 'test/karma.conf.js' }));
});

