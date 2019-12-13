const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  "mode": 'development',

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
