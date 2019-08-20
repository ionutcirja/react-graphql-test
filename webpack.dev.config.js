require('webpack');
const path = require('path');
const FlowBabelWebpackPlugin = require('flow-babel-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'client');

const config = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    app: [
      '@babel/polyfill',
      `${APP_DIR}/index.js`,
      'webpack-dev-server/client?http://0.0.0.0:8080',
    ],
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: '[name].js',
  },
  plugins: [
    new FlowBabelWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;
