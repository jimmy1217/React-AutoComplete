var Path = require("path");
//webpack core
var webpack = require("webpack");
var CompressionPlugin = require('compression-webpack-plugin');
var config = require('./webpack.config');
config.plugins.push(
    new webpack.optimize.DedupePlugin()
);

// set node_env = production
config.plugins.push(new webpack.DefinePlugin({
    'process.env': {
        'NODE_ENV': JSON.stringify('production')
    }
}));

// production 設定
config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    minimize: true,
    compress: {
        drop_debugger: true,
        warnings: false,
        drop_console: true
    }
}));

// preact 取代
config.resolve.alias['react'] = 'preact-compat';
config.resolve.alias['react-dom'] = 'preact-compat';

// 做 static gzip
config.plugins.push(new CompressionPlugin({
    asset: "[path].gz[query]",
    algorithm: "gzip",
    test: /\.js$|\.css$|\.html$/,
    threshold: 4000,
    minRatio: 0.8
}));


module.exports = config;
