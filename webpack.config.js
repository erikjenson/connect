const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, './public/bundles'),
    // publicPath: '../public/',
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.js',
  },
  externals: {
    express: 'express'
  },

  // mode: 'development',
  context: __dirname,
  // devtool: 'source-map',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ]
  }
}
