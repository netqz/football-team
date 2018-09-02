/* gulpfile.js */
'use strict'

const gulp = require('gulp')

const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const preprocess = require('gulp-preprocess')
const rename = require('gulp-rename')
const sass = require('gulp-sass')

gulp.task('css', () =>
{
    let stream = gulp.src('styles/interface.scss')
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(cssnano({
            discardComments: {
                removeAll: true
            }
        }))
        .pipe(gulp.dest('public'))

    return stream
})

gulp.task('watch:css', ['css'], () =>
{
    gulp.watch('styles/**/*.scss', ['css'])
})
