module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  // externals: {
  //   'jquery': 'jQuery'
  // },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
    ] //end rules
  }
}

