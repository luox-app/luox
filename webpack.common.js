const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    common: './src/javascript/common.js',
    upload: './src/javascript/upload.js',
    results: './src/javascript/results.js',
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  plugins: [
    new CopyPlugin([
      {
        from: '**/*',
        context: 'src/',
        ignore: ['*.js', '*.json', '*.css', '*.html']
      }
    ]),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      template: './src/generate-csv.html',
      filename: 'generate-csv.html',
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      template: './src/upload-csv.html',
      filename: 'upload-csv.html',
      chunks: ['common', 'upload']
    }),
    new HtmlWebpackPlugin({
      template: './src/results.html',
      filename: 'results.html',
      chunks: ['common', 'results']
    }),
    new HtmlWebpackPlugin({
      template: './src/explore.html',
      filename: 'explore.html',
      chunks: ['common', 'upload']
    }),
    new HtmlWebpackPlugin({
      template: './src/explore-results.html',
      filename: 'explore-results.html',
      chunks: ['common', 'results']
    })
  ]
};
