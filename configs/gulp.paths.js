exports.paths = {
  styles: {
    src: ["./src/css/*.css"],
    dest: "./public/css/",
  },
  scripts: {
    src: ["./src/js/*.js", "!./src/js/min/*.js"],
    dest: "./static/js/",
  },
  images: {
    src: [
      "./src/**/*.{jpg,png,webp,svg}",
      "./src/*.{jpg,png,webp,svg,ico,xml,webmanifest}",
    ],
    dest: "./static/",
  },
  document: {
    src: ["./src/*.html", "./src/**/*.html"],
    dest: "./static/",
    destAsSrc: ["./static/*.html", "./static/**/*.html"],
  },
};
