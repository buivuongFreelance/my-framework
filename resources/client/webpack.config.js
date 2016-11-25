var path = require('path');
var webpack = require("webpack");

module.exports = {
  entry: {
    bootstrap: './src/app/bootstrap',
    vendor: ['react', 'react-dom']
  },
  output: {
    path: path.join(__dirname, '..', '..', 'public', 'js'),
    publicPath: '/primaCare/public/js/',
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js'
  },
  module: {
    loaders: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        plugins: ['transform-decorators-legacy'],
        presets: ['react', 'es2015']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('init')
  ]
};