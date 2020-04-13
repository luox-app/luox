const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  "mode": 'development',

  entry: {
    upload: './src/javascript/upload.js',
    results: './src/javascript/results.js',
  },
  output: {
    filename: '[name].js',
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
        "ignore": ['*.js', '*.json', '*.css']
      }
    ])
  ]
};
