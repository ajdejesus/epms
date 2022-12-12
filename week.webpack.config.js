// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const config = {
  entry: "./week-script.js",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "week-scripts"),
  },
};

module.exports = () => {
  return config;
};
