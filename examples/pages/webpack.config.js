'use strict'
//https://github.com/wbkd/webpack-starter/blob/master/webpack/webpack.config.prod.js

const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require("path");


module.exports = function(env, argv) {

  const CONTENT_BASE = argv.contentBase
  const CONTENT_PUBLIC = `${CONTENT_BASE}/public`
  const MAIN_ENTRY = `${CONTENT_BASE}/src/main.js`
  console.log("argv", argv)
  let isProd = argv.mode === 'production'
  let minDescriptor  = ''// = isProd ? '.min' : '' //for now don't add min so grails dev is easier
  let devtool = isProd ? 'source-map' : 'inline-source-map'
  let pathout = argv.pathout ? path.resolve(argv.pathout) : path.resolve('./dist')
  //let pathout = path.resolve('./examples/ag-demo-grails/src/main/webapp')
  //let styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'
  let styleLoader = MiniCssExtractPlugin.loader //always use this as it shows the sourcemaps in browser
  console.log("argv.mode", argv.mode); console.log("isProd", isProd); console.log("styleLoader", styleLoader);

  let cfg = {
    mode: argv.mode,// || "production", pass in with --mode
    devtool: devtool,
    entry: {
      main: MAIN_ENTRY
    },
    output: {
      path: pathout, //path.join(__dirname, "dist"),
      filename: (chunkData) => `[name]${minDescriptor}.js`,
      libraryTarget: 'umd',
      publicPath: '/'
    },
    optimization: {
      chunkIds: "named",
      moduleIds: 'hashed', //makes it so the vendor chunks are cached and not rebuilt everytime
      splitChunks: {
        cacheGroups: {
          //default: false,
          //vendors: false,
          jquery: {
            test: /[\\/]node_modules[\\/](jquery|free-jqgrid|Select2|moment|toastr|sweetalert|eonasdan).*\.js/,
            chunks: "all",
            name: `jquery-libs${minDescriptor}`,
            priority: 20, //A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
            enforce: true //says to always build chunk and ignore min/max size stuff
          },
          vendor: {
            //test: /node_modules[\\/].*\.js/,
            test: /node_modules/,
            chunks: "all",
            name: `vendor-libs${minDescriptor}`,
            priority: 10, //lower priority so it won't pick up jquery
            enforce: true
          }
        }
      }
    },
    module: {
      rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|bower_components)/},
        {
          test: /\.(scss|css|sass)$/,
          use: [
            { loader: styleLoader },
            // translates CSS into CommonJS
            { loader: 'css-loader', options: { sourceMap: true } },
            // Runs compiled CSS through postcss for vendor prefixing
            { loader: 'postcss-loader', options: { sourceMap: true } },
            { loader: 'sass-loader',
              options: {
                sourceMap: true,
                sassOptions: {
                  outputStyle: 'compressed', //try expanded too
                }
              }
            }
          ]
        },
        {
          test: /\.less$/,
          use: [
            { loader: styleLoader },// creates style nodes from JS strings
            {
              loader: 'css-loader', // translates CSS into CommonJS
              options: { sourceMap: true }
            },
            { // Runs compiled CSS through postcss for vendor prefixing
              loader: 'postcss-loader',
              options: { sourceMap: true }
            },
            {
              loader: 'less-loader', // compiles Less to CSS
              options: { sourceMap: true }
            }
          ],
        },
        {
          // Load all images as base64 encoding if they are smaller than 8192 bytes
          test: /\.(png|jpg|gif)$/,
          use: [{
            loader: 'url-loader',
            options: {
              // On development we want to see where the file is coming from, hence we preserve the [path]
              name: '[path][name].[ext]?hash=[hash:20]',
              limit: 8192
            }
          }]
        },
        {
          // Load all icons
          test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/'
            }
          }]
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
      // new webpack.LoaderOptionsPlugin({
      //   test: /\.scss$/i,
      //   options: {
      //     postcss: {
      //       plugins: [autoprefixer]
      //     }
      //   }
      // }),
      new HtmlWebpackPlugin({
        title: 'Custom template using lodash',
        template: `${CONTENT_PUBLIC}/index.html`,
        //inject: 'body'
        //inject: false,
        //minify: false
      }),
      new CopyWebpackPlugin([{
        from: path.resolve(CONTENT_PUBLIC)
      }]),
      new MiniCssExtractPlugin({
        filename: 'assets/[name].css',
        allChunks: true
      })
    ],
    //command line options
    bail: true, //Fail out on the first error --bail
    //profile: false //list info on whats going on
  }
  if(isProd){
    cfg.plugins.push(
      new OptimizeCssAssetsPlugin({
        cssProcessor: require('cssnano'),
        cssProcessorOptions: {
          map: {
            inline: false,
          },
          discardComments: {
            removeAll: true
          },
          discardUnused: false
        },
        canPrint: true
      })
    )
  }
  cfg.devServer = {
    //compress: true, //gzips before serving so we can see file size
    port: 3000,
    // historyApiFallback: true,
    //inline: false, //default:true script will be inserted in your bundle to take care of live reloading

  }

  return cfg

  // let devConfig = getConfig(false)
  // devConfig.entry = { 'lib': './src/app/app.js' }
}
