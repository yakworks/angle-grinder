module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|dist)/},
      { test: /\.(scss|css|sass)$/, use: [ 'style-loader', 'css-loader', 'postcss-loader', 'sass-loader' ] },
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

