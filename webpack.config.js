const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  "mode": 'development',

  entry: './src/javascript/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },

  "plugins": [
    new CopyPlugin([
      {
        "from": '**/*',
        "context": 'src/',
        "ignore": ['*.js', '*.json']
      }
    ])
  ]
};
