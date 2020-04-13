const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  "mode": 'development',

  entry: {
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },

  "plugins": [
    new CopyPlugin([
      {
        "from": '**/*',
        "context": 'src/',
        "ignore": ['*.js', '*.json', '*.css', '*.html']
      }
    ]),

    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/generate-csv.html',
      filename: 'generate-csv.html',
      inject: false
    }),
    new HtmlWebpackPlugin({
      template: './src/upload-csv.html',
      filename: 'upload-csv.html',
      chunks: ['upload']
    }),
    new HtmlWebpackPlugin({
      template: './src/results.html',
      filename: 'results.html',
      chunks: ['results']
    }),
    new HtmlWebpackPlugin({
      template: './src/explore.html',
      filename: 'explore.html',
      chunks: ['upload']
    }),
    new HtmlWebpackPlugin({
      template: './src/explore-results.html',
      filename: 'explore-results.html',
      chunks: ['results']
    })
  ]
};
