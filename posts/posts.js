const fs = require("fs").promises;
const path = require("path");

const root = path.resolve(__dirname);

module.exports = [
  {
    id: "the-secret-history",
    title: "The Secret History",
    description: "",
    content: (async () => {
      const file = await fs.readFile(
        path.join(root, "The Secret History.md"),
        "utf-8",
      );
      return file;
    })(),
  },
];
