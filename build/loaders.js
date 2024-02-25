const fs = require("fs").promises;
const sass = require("sass");

module.exports = {
  file: (path) => {
    return async () => await fs.readFile(path);
  },
  scss: (path) => {
    return async () => (await sass.compileAsync(path)).css.toString();
  },
};
