//node path modules
var Path = require("path");
var config = require('./webpack.config');
var CopyWebpackPlugin = require('copy-webpack-plugin');
config.output.publicPath = "http://localhost:8080/";
config.devtool = 'eval';
config.debug = true;
config.devServer = {
    proxy: [
        {
            path: "/",
        }
    ],
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
        "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
};
// babel loader , 本機時透過react-hot 給 devServer
delete config.module.loaders[1].loader;
config.module.loaders[1].loaders = ['react-hot', 'babel-loader'];

// 將靜態image 資源丟給 devServer 
config.plugins.push(new CopyWebpackPlugin([ { from: './public/images/', to: './images/' } ]))
module.exports = config;
