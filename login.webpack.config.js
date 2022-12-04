// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");

const config = {
  entry: "./login-script.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "login-scripts"),
  },
};

module.exports = () => {
  return config;
};
