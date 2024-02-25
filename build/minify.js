const CleanCSS = require("clean-css");
const htmlMinify = require("html-minifier").minify;

module.exports = {
  css: (css) => new CleanCSS({}).minify(css).styles,
  html: (html) =>
    htmlMinify(html, {
      collapseWhitespace: true,
      removeComments: true,
    }),
};
