var path = require("path");

//console.log("process.argv", process.argv)
module.exports = (env, argv) => {
  let minDescriptor = argv.mode === 'production' ? '.min' : ''
  console.log("argv", argv); console.log("env", env); console.log("minDescriptor", minDescriptor);

  return {
    //mode: "development",// || "production", pass in with --mode
    entry: {
      bundle: "./src/bundle.js",
      // pageB: "./pageB",
      // pageC: "./pageC"
    },
    // externals: {
    //   'jquery': 'jQuery'
    // },
    optimization: {
      chunkIds: "named",
      moduleIds: 'hashed', //makes it so the vendor chunks are cached and not rebuilt everytime
      splitChunks: {
        cacheGroups: {
          //default: false,
          //vendors: false,
          jquery: {
            test: /[\\/]node_modules[\\/](jquery|free-jqgrid|Select2|moment|toastr|sweetalert|eonasdan)/,
            chunks: "all",
            name: `jquery-libs${minDescriptor}`,
            priority: 20, //A module can belong to multiple cache groups. The optimization will prefer the cache group with a higher priority
            enforce: true //says to always build chunk and ignore min/max size stuff
          },
          vendor: {
            test: /node_modules/,
            chunks: "all",
            name: `angular-libs${minDescriptor}`,
            priority: 10,
            enforce: true
          }
        }
      }
    },
    output: {
      path: path.resolve('./dist'), //path.join(__dirname, "dist"),
      filename: (chunkData) => `[name]${minDescriptor}.js`,
      libraryTarget: 'umd'
    },
    module: {
      rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      ] //end rules
    },
    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    devServer: {
      contentBase: './src/public',
      stats: 'minimal',
      host: '0.0.0.0'
    }
  }
}
