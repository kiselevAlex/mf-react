const path = require('path');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const { dependencies } = require("./package.json");

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
  plugins: [
    new ModuleFederationPlugin({
        name: "Blog",
        filename: "remoteEntry.js",
        exposes: {
          "./App": "./src/App",
        },
        shared: {
          react: { // react
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": { // react-dom
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
    }),
  ],
};