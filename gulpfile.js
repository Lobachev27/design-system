const gulp = require("gulp");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const gulpIf = require("gulp-if");
const gcmq = require("gulp-group-css-media-queries");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const fileinclude = require("gulp-file-include");
const prettier = require("gulp-prettier");
const del = require("del");

const config = {
  isDevelop: false,
};

gulp.task("html", function () {
  return gulp
    .src('./src/components/**/index.html', {base: './src'})
    .pipe(fileinclude({ prefix: "@@" }))
    .pipe(prettier({ singleQuote: true }))
    .pipe(gulp.dest('./public'))
    .pipe(browserSync.stream());
});

gulp.task("scssGlobal", function () {
  return gulp
      .src('./src/scss/**/*.scss')
      .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
      .pipe(sass().on("error", sass.logError))
      .pipe(concat('./css/style.css'))
      .pipe(autoprefixer({ overrideBrowserslist: [">0.1%"], cascade: false }))
      .pipe(gcmq())
      .pipe(gulpIf(!config.isDevelop, cleanCss({ level: 2 })))
      .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
      .pipe(gulp.dest('./public'))
      .pipe(browserSync.stream());
});

gulp.task("scss", function () {
  return gulp
      .src('./src/components/**/**/*.scss', {base: './src'})
      .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
      .pipe(sass().on("error", sass.logError))
      .pipe(autoprefixer({ overrideBrowserslist: [">0.1%"], cascade: false }))
      .pipe(gcmq())
      .pipe(gulpIf(!config.isDevelop, cleanCss({ level: 2 })))
      .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
      .pipe(gulp.dest('./public'))
      .pipe(browserSync.stream());
});

gulp.task("js", function () {
    return gulp
        .src('./src/components/**/*.js', {base: './src'})
        .pipe(gulpIf(!config.isDevelop, uglify({ toplevel: false })))
        .pipe(gulp.dest('./public'))
        .pipe(browserSync.stream());
});

gulp.task("img", function () {
  return gulp
      .src('./src/img/**/*.*')
      .pipe(
          imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true,
          })
      )
      .pipe(gulp.dest('./public/img'))
      .pipe(browserSync.stream());
});

gulp.task("clear", function () {
  return del([
    './public/img/*.*',
    './public/css/style.css',
    './public/components/**/**/*.*'
  ]);
});

gulp.task("clearTemplate", function () {
  return del([
    './public/components/**/template/'
  ]);
});

gulp.task("serve", function () {
  browserSync.init({
    server: {
      baseDir: './public',
    },
    tunnel: false,
  });

  gulp.watch('./src/components/**/*.html', gulp.parallel("html"));
  gulp.watch('./src/scss/**/*.scss', gulp.series("scssGlobal"));
  gulp.watch('./src/components/**/**/*.scss', gulp.series("scss"));
  gulp.watch('./src/components/**/*.js', gulp.series("js"));
  gulp.watch('./src/img/**/*.*', gulp.series("img"));
});

gulp.task(
    "build",
    gulp.series("clear", gulp.parallel("html", "scssGlobal", "scss", "js", "img"), "clearTemplate")
);
gulp.task(
    "default",
    gulp.series("clear", gulp.parallel("html", "scssGlobal", "scss", "js", "img"), "clearTemplate", "serve")
);
