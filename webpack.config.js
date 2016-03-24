var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: "./app/index.jsx"
  },
  output: {
    filename: 'bundle.js',
    path: 'dist'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: /\.jsx?$/, loader: 'babel-loader?experimental', exclude: [/node_modules/, './app/js/vendor/'] },
      { test: /\.scss$/, loaders: ["style", "css?sourceMap", "sass?sourceMap"]},
      { test: /\.less$/, loader: ExtractTextPlugin.extract('css?sourceMap!less?sourceMap')}
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.jsx', '.css', '.scss', '.less'],
    modulesDirectories: [
      './node_modules',
      './app/js',
      './app/styles'
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new ExtractTextPlugin('/styles/[name].css'),
    new HtmlWebpackPlugin({
      inject: false,
      template: 'node_modules/html-webpack-template/index.ejs',
      appMountId: 'app'
    })
  ],
};
