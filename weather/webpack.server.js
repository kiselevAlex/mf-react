const path = require("path");
const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");

module.exports = {
  target: "node",
  mode: "development",
  externals: [nodeExternals()],
  entry: "./server/index.js",
  output: {
    path: path.resolve("server-build"),
    filename: "index.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.ASSET_PATH": '"/weather"',
    }),
  ],
};
