const argv = require('yargs-parser')(process.argv.slice(2));
const merge = require('webpack-merge');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const {
    resolve,
    join,
    basename
} = require("path");
const _mode = argv.mode || "development";
let _mergeConfig = "";
if (argv.env == "sever") {
    _mergeConfig = require(`./config/webpack.server.js`);
} else {
    _mergeConfig = require(`./config/webpack.${_mode}.js`);
}

const _modeflag = (_mode == "production" ? true : false);
const {
    VueLoaderPlugin
} = require('vue-loader')
let _plugins = [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
    })
];
let webpackConfig = {
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                extractCSS:true
            }
        }, {
            test: /\.js$/,
            loader: 'babel-loader'
        }, {
            test: /\.css$/,
            use: [
                'vue-style-loader',
                MiniCssExtractPlugin.loader,
                'css-loader',
                'postcss-loader'
            ]
        },{
            test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: _modeflag ? "images/[name].[hash:5].[ext]" : "images/[name].[ext]"
                }
            }]
        }]
    },
    watch: !_modeflag,
    watchOptions: {
        ignored: /node_modules/,
        aggregateTimeout: 300,
        poll: 1
    },
    optimization: {

    },
    output: {
        path: join(__dirname, './dist/assets'),
        publicPath: "/",
        filename: "scripts/[name].bundle.js"
    },
    plugins: [
        ..._plugins,
    ],
    resolve: {
        modules: [
            resolve(__dirname, 'node_modules'),
        ],
        extensions: [".js", ".css", ".vue"]
    }
};
module.exports = merge(webpackConfig, _mergeConfig);