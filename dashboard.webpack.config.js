// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const config = {
  entry: "./dashboard-script.js",
  mode: "development",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "dashboard-scripts"),
  },
};

module.exports = () => {
  return config;
};
