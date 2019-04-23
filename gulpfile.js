const gulp = require("gulp");
const babel = require("gulp-babel");
const eslint = require("gulp-eslint");

gulp.task('default', async function () {
    // eslint 실행
    gulp.src(["/Source/**/*.js"])
        .pipe(eslint())
        .pipe(eslint.format());

    // 소스
    gulp.src("/Source/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
})