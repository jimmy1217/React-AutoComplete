//node path modules
var Path = require("path")
//webpack core
var webpack = require("webpack")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
    entry: {
        // 共用vendor js
        vendor: ['react', 'react-dom', 'classnames'],
        // main js
        app: ['normalize.css', Path.resolve(__dirname, "./src/app.js")],
    },
    // output bundle
    output: {
        //實體檔案路徑
        path: Path.resolve(__dirname, "./public/"),
        // [name]表示以entry的key命名
        publicPath: "./",
        filename: "[name].js",
        sourceMapFilename: "[name].bundle.js.map",
        chunkFilename: '[name].[chunkhash:5].chunk.js',
        libraryTarget: "umd"
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style?insertAt=top&-singleton', ['css?minimize!postcss'])
                // loader: 'style?insertAt=top&-singleton!css?minimize?sourceMap!autoprefixer?browsers=last 2 version!postcss-loader'
                // loader: 'style?insertAt=top&-singleton!css?minimize!postcss!'
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
        presets: ['es2015', 'stage-0', 'react', 'flow'],
        "plugins": [
            ["transform-flow-strip-types"],
            ["transform-runtime"]
        ]
    },
    externals: {},
    plugins: [
        // 告訴webpack看到字串自動require指定module
        // new webpack.ProvidePlugin({
        //     "classNames": "classnames"
        // }),
        // common file 暫時關閉, 讓autocomplete 獨立出來
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.js"),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'template.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            // autocomplete 是要單獨抽出,demo 頁不引入
            // excludeChunks:['style'],
            hash: true,
            cache: false
        }),
        // css抽離js
        new ExtractTextPlugin("./css/[name].css"),
    ],
    resolve: {
        // require 檔案時的根目錄
        root: Path.resolve(__dirname, "./"),
        // import 時指定特定的路徑
        alias: {
            modules: Path.join(__dirname, "node_modules"),
            'components': Path.join(__dirname, "./src/components/"),
            'demoComponents': Path.join(__dirname, "./src/demo-components/"),
        },
        // require 時可不寫 .js
        extensions: ['', '.js', '.css']
    }
}

module.exports = config
