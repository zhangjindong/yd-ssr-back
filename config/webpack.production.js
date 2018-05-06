const path = require("path");
const rootPath = path.join(__dirname, '..');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const vueSSRClientPlugin = require("vue-server-renderer/client-plugin");
module.exports = {
    entry: [rootPath + "/src/webapp/entry-client.js"],
    output: {
        filename: "scripts/[name].[hash:5].bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/webapp/index.html',
            inject: false
        })
    ],
}
