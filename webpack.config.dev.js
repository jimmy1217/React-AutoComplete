//node path modules
var Path = require("path")
var config = require('./webpack.config')

config.output.publicPath = "http://localhost:8080/"
config.devtool = 'cheap-module-eval-source-map'
config.debug = true
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
}
// dev 不使用 ExtractTextPlugin
config.plugins.pop()
config.module.loaders[0].loader = 'style?insertAt=top&-singleton!css?minimize!postcss!'
// babel loader , 本機時透過react-hot 給 devServer
delete config.module.loaders[1].loader
config.module.loaders[1].loaders = ['react-hot-loader/webpack', 'babel-loader']


module.exports = config
