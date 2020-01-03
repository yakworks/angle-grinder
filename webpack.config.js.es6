const webpackMerge = require('webpack-merge');

module.exports = function (env) {

    process.env.NODE_ENV = (env === 'dev') ? 'development' : 'production';

    require('dotenv').config({path: `./config/.env.${process.env.NODE_ENV}`});
    require('dotenv').config({path: './config/.env.default'});    

    const commonConfig = require('./config/webpack.common.js');
    const config = require(`./config/webpack.${env}.js`);

    return webpackMerge(commonConfig, config);

};
