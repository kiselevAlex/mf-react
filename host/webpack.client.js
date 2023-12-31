const path = require("path");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const { dependencies } = require("./package.json");

module.exports = {
  target: "web",
  mode: "development",
  entry: "./client/index.js",
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
  plugins: [
    new webpack.DefinePlugin({
      "process.env.BUILD_TARGET": '"client"',
    }),
    new ModuleFederationPlugin({
      name: "Host",
      remotes: {
        Weather: "Weather@http://localhost:3006/mf-weather/remoteEntry.js",
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: dependencies["react"],
        },
        "react-dom": {
          singleton: true,
          requiredVersion: dependencies["react-dom"],
        },
        swr: {
          singleton: true,
          requiredVersion: dependencies["swr"],
        },
        "@mf/api": {
          singleton: true,
        },
        "react-router-dom": {
          singleton: true,
          requiredVersion: dependencies["react-router-dom"],
        },
      },
    }),
  ],
};
