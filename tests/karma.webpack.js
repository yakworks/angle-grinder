module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  // externals: {
  //   'jquery': 'jQuery'
  // },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|dist)/},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader'] },
      { test: /\.less$/, use: [ 'style-loader', 'css-loader', 'less-loader' ] },
      { test: /\.(png|jpg|jpeg|gif|woff(2)?|ttf|eot|svg)$/, use:'file-loader'},
      {
        test: /\.html$/,
        use: [{
          loader: 'raw-loader',
          options: { esModule: false }
        }]
      }

    ] //end rules
  }
}

