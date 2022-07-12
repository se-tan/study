// const path = require("path");

module.exports = {
  mode: "production",

  // JavaScript file as main.
  entry: "./src/main.ts",

  module: {
    rules: [
      {
        test: /\.ts$/,

        use: "ts-loader",
      },
    ],
  },

  resolve: {
    extentions: [".ts", ".js"],
  },
  target: ["web", "es5"],
};
