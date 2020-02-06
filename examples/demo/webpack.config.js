'use strict'
//https://github.com/wbkd/webpack-starter/blob/master/webpack/webpack.config.prod.js

//const webpack = require('webpack')
//const autoprefixer = require('autoprefixer')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries")
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const HtmlWebpackExcludeAssetsPlugin = require('html-webpack-exclude-assets-plugin')
//const ThemesGeneratorPlugin = require('themes-switch/ThemesGeneratorPlugin')
//const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require("path");

module.exports = function(env, argv) {

  const CONTENT_BASE = argv.contentBase
  const CONTENT_PUBLIC = `${CONTENT_BASE}/public`
  const MAIN_ENTRY = `${CONTENT_BASE}/src/main.js`
  console.log("argv", argv)
  let isProd = argv.mode === 'production'
  let minDescriptor  = ''// = isProd ? '.min' : '' //for now don't add min so grails dev is easier
  let devtool = isProd ? 'source-map' : 'inline-source-map' //'eval-source-map'
  let pathout = argv.pathout ? path.resolve(argv.pathout) : path.resolve('./dist')
  //let pathout = path.resolve('./examples/ag-demo-grails/src/main/webapp')
  //let styleLoader = isProd ? MiniCssExtractPlugin.loader : 'style-loader'
  let styleLoader = MiniCssExtractPlugin.loader //always use this as it shows the sourcemaps in browser
  console.log("argv.mode", argv.mode); console.log("isProd", isProd); console.log("styleLoader", styleLoader);

  let cfg = {
    mode: argv.mode,// || "production", pass in with --mode
    devtool: devtool,
    entry: {
      main: MAIN_ENTRY,
      // 'theme-dark': `${CONTENT_BASE}/src/assets/themes/dark.scss`,
      // 'theme-light': `${CONTENT_BASE}/src/assets/themes/light.scss`,
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
          //exclude: /themes\/.+\.scss$/,
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
                  outputStyle: 'expanded' //'compressed', //try expanded too
                }
              }
            }
          ]
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
              name: '[path][name].[ext]',
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
      //if the entry is a scss such as for themes this will remove the js file that is erroniouly created, wil be fixed in webpack5
      new FixStyleOnlyEntriesPlugin(),
      new HtmlWebpackPlugin({
        //title: 'Custom template using lodash',
        template: `${CONTENT_PUBLIC}/index.ejs`,
        inject: false,
        minify: false
        // excludeAssets: /theme.+\.css$/ //not working when we do it by hand like we are in the index.ejs
      }),
      //new HtmlWebpackExcludeAssetsPlugin(),
      new CopyWebpackPlugin([{
        from: path.resolve(CONTENT_PUBLIC)
      }]),
      new MiniCssExtractPlugin({
        moduleFilename: ({ name }) => {
          return /theme/.test(name) ? `assets/theme/${name.replace('theme-','')}.css` : `assets/${name}.css`
          //return `${prefix}/${name}.css`
        },
        //filename: 'assets/[name].css',
        allChunks: true
      }),
      // new ThemesGeneratorPlugin({
      //   srcDir: `${CONTENT_BASE}/src`,
      //   themesDir: `${CONTENT_BASE}/src/assets/themes`,
      //   outputDir: 'assets/themes',
      //   useStaticThemeName: true,
      //   defaultStyleName: 'default.scss',
      //   importAfterVariables: true
      // })
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
  //add themes scss to entries
  ['light', 'dark', 'dark-red', 'dark-light', 'dark-green', 'dark-3'].forEach( (name) => {
    cfg.entry[`theme-${name}`] = `${CONTENT_BASE}/src/assets/themes/${name}.scss`
  })

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
