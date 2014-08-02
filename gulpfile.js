var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename')
    package = require('./package.json'),
    paths = {
        scripts: {
            src: 'src/' + package.name + '.js',
            dist: 'dist/' + package.name + '.js'
        },
        output: 'dist/'
    };

gulp.task('lint', function(){
    return gulp.src(paths.scripts.src)
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(gulp.dest(paths.output));
});

gulp.task('minify', ['lint'], function(){
    return gulp.src(paths.scripts.dist)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.output));
});

