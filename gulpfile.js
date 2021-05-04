const gulp = require("gulp"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssnano = require("cssnano"),
  replace = require("gulp-replace"),
  cache = require("gulp-cached"),
  terser = require("gulp-terser"),
  sourcemaps = require("gulp-sourcemaps"),
  imageResize = require("gulp-image-resize"),
  imagemin = require("gulp-imagemin"),
  cachebust = require("gulp-cache-bust"),
  gulp_remove_logging = require("gulp-remove-logging"),
  gulpif = require("gulp-if"),
  tailwind = require("tailwindcss"),
  browsersync = require("browser-sync").create(),
  newer = require("gulp-newer"),
  concat = require("gulp-concat");

const dotenv = require("dotenv");
dotenv.config();

var verbose = true;
var isProduction = false;
if (process.env.ENVIRONMENT == "production") {
  verbose = false;
  isProduction = true;
}

const { paths } = require("./configs/gulp.paths");
const {
  tailwindConfigDev,
  tailwindConfigProd,
} = require("./configs/tailwind.config.js");

function cssTask() {
  return gulp
    .src(paths.styles.src)
    .pipe(newer(paths.styles.dest + "style.css"))
    .pipe(sourcemaps.init())
    .pipe(postcss([tailwind(tailwindConfigDev), autoprefixer(), cssnano()]))
    .pipe(concat({ path: "style.css" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.styles.dest));
}

function cssTaskProd() {
  return gulp
    .src(paths.styles.src)
    .pipe(postcss([tailwind(tailwindConfigProd), autoprefixer(), cssnano()]))
    .pipe(concat({ path: "style.css" }))
    .pipe(gulp.dest(paths.styles.dest));
}

function jsTask() {
  return gulp
    .src(paths.scripts.src)
    .pipe(gulpif(!isProduction, newer(paths.scripts.dest)))
    .pipe(sourcemaps.init())
    .pipe(
      gulpif(
        isProduction,
        gulp_remove_logging({
          methods: ["log"],
        })
      )
    )
    .pipe(terser())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(paths.scripts.dest));
}

function copyImages() {
  return gulp.src(paths.images.src).pipe(gulp.dest(paths.images.dest));
}

function copyHtml() {
  return gulp
    .src(paths.document.src)
    .pipe(
      cachebust({
        type: "timestamp",
      })
    )
    .pipe(gulp.dest(paths.document.dest));
}

function browsersyncReload(cb) {
  browsersync.reload();
  cb();
}

function watchTask() {
  gulp.watch(
    [...paths.styles.src, ...paths.scripts.src, ...paths.document.src],
    gulp.series(gulp.parallel(cssTask, jsTask, copyHtml), browsersyncReload)
  );
}

function browsersyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: "./public",
    },
  });
  cb();
}

exports.build = gulp.series(
  gulp.parallel(cssTaskProd, jsTask, copyHtml, copyImages)
);

exports.default = gulp.series(
  gulp.parallel(cssTask, jsTask, copyHtml),
  browsersyncServe,
  watchTask
);
