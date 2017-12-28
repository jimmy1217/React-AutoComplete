//node path modules
var Path = require("path");
//webpack core
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var staticRoute = require('./src/official/route');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: {
        // 共用vendor js
        vendor: ['react', 'react-dom', 'classnames', 'rc-queue-anim', 'recompose/pure'],
        // main js
        app: [Path.resolve(__dirname, "./src/official/app.js")],
    },
    // output bundle
    output: {
        //實體檔案路徑
        path: Path.resolve(__dirname, "./public/official/"),
        // [name]表示以entry的key命名
        publicPath: "/official/",
        filename: "[name].js",
        sourceMapFilename: "[name].bundle.js.map",
        chunkFilename: '[name].[chunkhash:5].chunk.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style?insertAt=top&-singleton', ['css?minimize?sourceMap!autoprefixer?browsers=last 2 version!'])
                // loader: 'style?insertAt=top&-singleton!css?minimize?sourceMap!autoprefixer?browsers=last 2 version!postcss-loader'
                loader: 'style?insertAt=top&-singleton!css?minimize!postcss!'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.png$/,
                loader: "url-loader?limit=30000"
            }, {
                test: /\.jpg$/,
                loader: "url-loader?limit=30000"
            }, {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            }, {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            }, {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    },
    babel: {
        presets: ['es2015', 'stage-0', 'react'],
        //webpack 1 沒有 tree shake, 折衷一下
        plugins: [["import", [{
            "libraryName": "react-router",
            "libraryDirectory": "lib",
            "camel2DashComponentName": false
        }]]]
    },
    externals: {},
    plugins: [
        // 告訴webpack看到字串自動require指定module
        new webpack.ProvidePlugin({
            "React": "react",
            "ReactDOM": "react-dom",
            "classNames": "classnames"
        }),
        // common file
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.js"),
        // css抽離js
        // new ExtractTextPlugin("./css/[name].css")
    ],
    resolve: {
        // require 檔案時的根目錄
        root: Path.resolve(__dirname, "./"),
        // import 時指定特定的路徑
        alias: {
            modules: Path.join(__dirname, "node_modules"),
            'assets': Path.join(__dirname, "./public/images/"),
            'components': Path.join(__dirname, "./src/official/components/"),
            'route': Path.join(__dirname, "./src/official/route/"),
            'helpers': Path.join(__dirname, "./src/official/helpers/")
        },
        // require 時可不寫 .js
        extensions: ['', '.js','.css']
    }
};

//靜態 page route
Object.keys(staticRoute).map((page) => {
    config.plugins.push(
        new HtmlWebpackPlugin({
            filename: `./../${staticRoute[page]}`,
            template: 'template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            hash: true,
            cache: false
        })
    )
})

module.exports = config;
