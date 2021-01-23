const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "source-map",
  entry: resolve(__dirname, "src", "tetris.js"),
  output: {
    filename: "tetris.js",
    path: resolve(__dirname),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "eslint-loader?{fix:true}",
        enforce: "pre",
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, "src", "index.html"),
      title: "Tetris",
    }),
  ],
};
