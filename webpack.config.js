'use strict'
// Modules
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
var path = require("path");


module.exports = (env, argv) => {
  const CONTENT_BASE = argv.contentBase
  const CONTENT_PUBLIC = `${CONTENT_BASE}/public`
  const MAIN_ENTRY = `${CONTENT_BASE}/src/main.js`
  console.log("argv", argv)
  let isProd = argv.mode === 'production'
  let minDescriptor = isProd ? '.min' : ''
  let devtool = isProd ? 'source-map' : 'inline-source-map'
  let styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'
  console.log("argv.mode", argv.mode); console.log("isProd", isProd); console.log("styleLoader", styleLoader);

  let cfg = {
    mode: argv.mode,// || "production", pass in with --mode
    devtool: devtool,
    entry: {
      main: MAIN_ENTRY
    },
    output: {
      path: path.resolve('./dist'), //path.join(__dirname, "dist"),
      filename: (chunkData) => `[name]${minDescriptor}.js`,
      libraryTarget: 'umd',
      publicPath: '/'
    },
    module: {
      rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
        {
          test: /\.css$/,
          use: [
            styleLoader,
            'css-loader',
            //'postcss-loader'
          ]
        },
        {
          test: /\.less$/,
          use: [
            styleLoader, // creates style nodes from JS strings
            'css-loader', // translates CSS into CommonJS
            'less-loader' // compiles Less to CSS
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
          loader: 'file-loader'
        },
        {
          test: /\.html$/,
          use: [{
            loader: 'raw-loader',
            options: { esModule: false }
          }]
        }
      ] //end rules
    },
    plugins:[
      new webpack.LoaderOptionsPlugin({
        test: /\.scss$/i,
        options: {
          postcss: {
            plugins: [autoprefixer]
          }
        }
      }),
      new HtmlWebpackPlugin({
        template: `${CONTENT_PUBLIC}/index.html`,
        //inject: 'body'
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(CONTENT_PUBLIC)
      }])
    ]
  }
  if(isProd){
    cfg.plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].css',
        allChunks: true
      })
    )
  }
  return cfg

  // let devConfig = getConfig(false)
  // devConfig.entry = { 'lib': './src/app/app.js' }
}
