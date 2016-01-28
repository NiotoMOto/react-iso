'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client?reload=true',
    path.join(__dirname, 'src/client/index.tsx')
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    path: path.join(__dirname, '/public/'),
    filename: '[name].js',
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      disable: false,
      allChunks: true
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
        BROWSER: JSON.stringify(true)
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
     loaders: [{
       test: /\.tsx?$/,
       exclude: /node_modules/,
       loaders: ['babel', 'ts-loader']
     }, {
       test: /\.json?$/,
       loader: 'json'
     },
     {
       test: /\.scss$/,
       loader: ExtractTextPlugin.extract('style', 'css!sass')
     }]
   }
 };0
