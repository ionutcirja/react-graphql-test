require('webpack');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'public');
const APP_DIR = path.resolve(__dirname, 'client');

const config = {
  mode: 'production',
  devtool: 'source-map',
  entry: {
    app: [
      '@babel/polyfill',
      `${APP_DIR}/index.js`,
    ],
  },
  output: {
    path: BUILD_DIR,
    publicPath: '/public/',
    filename: '[name].js',
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
};

module.exports = config;
