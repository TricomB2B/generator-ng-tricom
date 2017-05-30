'use strict';

// core packages
const webpack = require('webpack');
const path    = require('path');
// webpack plugins
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// globals
const PROD = process.env.NODE_ENV === 'production';

module.exports = () => {
  const config = {
    context: path.resolve(__dirname, 'src/'),
    cache: true,
    resolve: {
      alias: {
        Images: path.resolve(__dirname, 'src/img/')
      },
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    entry: {
      'vendor': './app/vendor.ts',
      'app': './app/<%= lowPrefix %>.module.ts'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'js/[name].[hash].js'
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            configFile: path.join(__dirname, 'tslint.json'),
            formatter: 'stylish',
            emitErrors: true,
            failOnHint: true,
            typeCheck: true
          }
        },
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'awesome-typescript-loader',
          options: {
            useBabel: true,
            useCache: true
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              'css-loader?sourceMap=true',
              'postcss-loader',
              'sass-loader?sourceMap=true',
              {
                loader: 'sass-resources-loader',
                options: {
                  resources: [
                    path.resolve(__dirname, 'node_modules/bourbon/core/bourbon/helpers/*.scss'),
                    path.resolve(__dirname, 'node_modules/bourbon/core/bourbon/settings/*.scss'),
                    path.resolve(__dirname, 'node_modules/bourbon/core/bourbon/validators/*.scss'),
                    path.resolve(__dirname, 'node_modules/bourbon/core/bourbon/utilities/*.scss'),
                    path.resolve(__dirname, 'node_modules/bourbon/core/bourbon/library/*.scss'),
                    path.resolve(__dirname, 'src/scss/_settings.scss'),
                    path.resolve(__dirname, 'src/scss/util/*.scss')
                  ]
                }
              }
            ]
          })
        },
        {
          test: /\.html$/,
          use: 'html-loader'
        },
        {
          test: /\.(jpe?g|png|svg)$/,
          use: 'file-loader?name=/[path][name].[ext]'
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: 'css/app.[contenthash].css'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        names: ['app', 'vendor']
      }),
      new HtmlWebpackPlugin({
        template: './index.ejs'
      })
    ],
    devtool: 'source-map',
    performance: {
      maxAssetSize: 250000,
      maxEntrypointSize: 250000
    },
    devServer: {
      contentBase: path.join(__dirname, 'src'),
      compress: true,
      port: 3000,
      clientLogLevel: 'warning',
      historyApiFallback: true,
      stats: 'errors-only',
      overlay: true,
      watchContentBase: true
    }
  };

  if (PROD) {
    config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true
        },
        output: {
          comments: false
        },
        sourceMap: true
      }),
      new CopyWebpackPlugin([
        { from: '.htaccess' },
        { from: 'data.json' },
        { from: 'svg4everybody.min.js' },
        { from: 'img/favicons', to: 'img/favicons' }
      ])
    );
  }

  return config;
};
