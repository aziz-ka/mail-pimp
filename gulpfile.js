var gulp = require("gulp"),
    nodemon = require("gulp-nodemon"),
    plumber = require("gulp-plumber"),
    livereload = require("gulp-livereload"),
    sass = require("gulp-ruby-sass"),
    config = require("./config.js")();

gulp.task("sass", function () {
  return sass(config.stylesDir)
    .pipe(gulp.dest(config.stylesDir))
    .pipe(livereload());
});

gulp.task("watch", function() {
  gulp.watch(config.allStyles, ["sass"]);
});

gulp.task("develop", function () {
  livereload.listen();
  nodemon({
    script: "bin/www",
    ext: "js hb coffee",
    stdout: false
  }).on("readable", function () {
    this.stdout.on("data", function (chunk) {
      if(/^Express server listening on port/.test(chunk)){
        livereload.changed(__dirname);
      }
    });
    this.stdout.pipe(process.stdout);
    this.stderr.pipe(process.stderr);
  });
});

gulp.task("default", [
  "sass",
  "develop",
  "watch"
]);
