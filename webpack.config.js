var path = require("path");

//console.log("process.argv", process.argv)
module.exports = (env, argv) => {
  console.log("argv", argv)
  console.log("env", env)
  return {
    //mode: "development",// || "production", pass in with --mode
    entry: {
      bundle: "./src/bundle.js",
      // pageB: "./pageB",
      // pageC: "./pageC"
    },
    externals: {
      'jquery': 'jQuery'
    },
    optimization: {
      chunkIds: "named",
      splitChunks: {
        cacheGroups: {
          //default: false,
          //vendors: false,
          jquery: {
            test: /node_modules\/(jquery|jpg|gif)/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          },
          vendor: {
            test: /node_modules/,
            chunks: "initial",
            name: "vendor",
            priority: 10,
            enforce: true
          }
        }
      }
    },
    output: {
      path: path.join(__dirname, "dist"),
      filename: "[name].js"
    },
    module: {
      rules: [
        { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      ] //end rules
    }
  }
}
