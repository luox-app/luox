const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    menu: "./src/javascript/menu.js",
    upload: "./src/javascript/upload.jsx",
  },

  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new CopyPlugin([
      {
        from: "examples/*",
        context: "src/",
      },
    ]),

    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html",
      chunks: ["menu"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/generate-csv.html",
      filename: "generate-csv.html",
      chunks: ["menu"],
    }),
    new HtmlWebpackPlugin({
      template: "./src/upload-csv.html",
      filename: "upload-csv.html",
      chunks: ["menu", "upload"],
    }),
  ],
};
