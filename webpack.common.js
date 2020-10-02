const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/javascript/upload.js',
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
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

  resolve: {
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new CopyPlugin([
      {
        from: 'index.html',
        context: 'src/',
      },
      {
        from: 'generate-csv.html',
        context: 'src/',
      },
      {
        from: 'examples/*',
        context: 'src/',
      }
    ]),

    new HtmlWebpackPlugin({
      template: './src/upload-csv.html',
      filename: 'upload-csv.html'
    })
  ]
};
