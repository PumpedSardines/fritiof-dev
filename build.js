// Custom build script for the project

const fs = require("fs");
const path = require("path");
const ejs = require("ejs");
const minify = require("./build/minify.js");
const loaders = require("./build/loaders.js");

const root = path.resolve(__dirname, "src");
const out = path.resolve(__dirname, "dist");

const paths = {
  assets: {
    "arkivet.png": loaders.file(path.join(root, "assets/arkivet.png")),
    "obayaty.png": loaders.file(path.join(root, "assets/obayaty.png")),
    "ray-tracer.png": loaders.file(path.join(root, "assets/ray-tracer.png")),
    "wordfeud.png": loaders.file(path.join(root, "assets/wordfeud.png")),
    "flower.svg": loaders.file(path.join(root, "assets/flower.svg")),
    "github-mark.svg": loaders.file(path.join(root, "assets/github-mark.svg")),
    "wiggle-1.svg": loaders.file(path.join(root, "assets/wiggle-1.svg")),
    "wiggle-2.svg": loaders.file(path.join(root, "assets/wiggle-2.svg")),
    "wiggle-3.svg": loaders.file(path.join(root, "assets/wiggle-3.svg")),
  },
  styles: {
    "default.css": async () => {
      const css = loaders.scss(path.join(root, "styles/default.scss"));

      return minify.css(await css());
    },
    "home.css": async () => {
      const css = loaders.scss(path.join(root, "styles/pages/home/index.scss"));

      return minify.css(await css());
    },
  },
  "index.html": async () => {
    const output = await ejs.renderFile(
      path.join(root, "pages/home/index.html"),
      {},
      { async: true },
    );

    return minify.html(output);
  },
};

async function build(folder, paths) {
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  for (const [file, type] of Object.entries(paths)) {
    if (typeof type === "function") {
      const content = await type();

      if (typeof content === "string" || content instanceof Buffer) {
        fs.writeFileSync(path.join(folder, file), content);
      } else {
        throw new Error(
          `Invalid content type: ${typeof content}, for file ${path.join(
            folder,
            file,
          )}`,
        );
      }
    } else {
      await build(path.join(folder, file), type);
    }
  }
}

build(out, paths).catch((err) => {
  console.error(err);
  process.exit(1);
});
