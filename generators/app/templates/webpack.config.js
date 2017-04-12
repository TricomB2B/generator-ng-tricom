'use strict';

const webpack = require('webpack');
const path    = require('path');

module.exports = (options) => {
  const babelConfig =  {
    presets: [
      [require.resolve('babel-preset-es2015'), { loose: true, modules: false }],
      require.resolve('babel-preset-stage-3')
    ]
  };

  const config = {
    cache: true,
    resolve: {
      modules: [
        'node_modules',
        path.join(__dirname, 'node_modules')
      ],
      extensions: ['.js', '.ts', '.jsx', '.tsx']
    },
    entry: options.entryPoints,
    output: {
      path: path.join(__dirname, options.outputDir),
      filename: '[name].js'
    },
    module: {
      loaders: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          enforce: 'pre',
          loader: require.resolve('tslint-loader'),
          query: {
            configFile: path.join(__dirname, 'tslint.json'),
            formatter: 'stylish'
          }
        },
        {
          test: /\.ts(x?)$/,
          exclude: /node_modules/,
          loaders:[
            require.resolve('babel-loader') + '?' + JSON.stringify(babelConfig),
            require.resolve('ts-loader'),
          ]
        }
      ]
    },
    devtool: 'source-map',
    performance: {
      maxAssetSize: 250000,
      maxEntrypointSize: 250000
    }
  };

  if (options.uglify) {
    config.plugins = [
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
      })
    ];
  }

  return config;
};
