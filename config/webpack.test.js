//const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const buildPath = path.resolve('./dist')

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/},
      // {
      //   test: /\.js$/,
      //   include: /tests/,
      //   use: {
      //     loader: 'inject-imports-loader',
      //     options: {
      //       'angular': 'angular',
      //       'angular-mocks': true
      //     }
      //   }
      // },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: { sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true}
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: { sourceMap: true }
          }
        ]
      }, //end css
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        loader: 'file-loader'
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      }
    ] //end rules
  } //end modules
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './src/public/index.html',
  //     inject: 'body'
  //   })
  // ]
}

