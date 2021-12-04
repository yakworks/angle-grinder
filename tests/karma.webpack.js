const path = require("path");

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.mjs', '.js', '.svelte'],
    alias: {
      'angle-grinder': path.resolve('./'),
    }
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /(node_modules|dist)/},
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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

