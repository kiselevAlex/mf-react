const path = require('path');

module.exports = {
  target: 'web',
  mode: 'development',
  entry: "./src/index.js",
  output: {
    filename: "client.bundle.js",
    path: path.resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
    ],
  },
};