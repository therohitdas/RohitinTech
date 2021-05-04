exports.paths = {
  styles: {
    src: ["./source/css/*.css"],
    dest: "./public/css/",
  },
  scripts: {
    src: ["./source/js/*.js", "!./source/js/min/*.js"],
    dest: "./public/js/",
  },
  images: {
    src: [
      "./source/**/*.{jpg,png,webp,svg}",
      "./source/*.{jpg,png,webp,svg,ico,xml,webmanifest}",
    ],
    dest: "./public/",
  },
  document: {
    src: ["./source/*.html", "./source/**/*.html"],
    dest: "./public/",
    destAsSrc: ["./public/*.html", "./public/**/*.html"],
  },
};
