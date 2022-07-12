module.exports = {
  mode: "development",
  entry: `./src/index.js`,

  // Activate local development env.
  // Browser is automatically opened localhost at run time.
  devServer: {
    static: "dist",
    open: true,
  },

  output: {
    path: `${__dirname}/dist`,
    filename: "main.js",
  },
};
