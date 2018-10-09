// 基于node common.js的规范
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let webpack = require("webpack"); //自带
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')  //css代码抽离成文件
// let lessExtract = new ExtractTextWebpackPlugin({
//     filename: 'css/less.css',
//     // disable: true   //开发是不用抽离(保留css-loader热更新功能) 上线时在抽离
// })
// let PurifycssWebpack = require('purifycss-webpack')
// let glob = require('glob')
module.exports = {
    entry: "./src/js/app.js",
    output: {
        filename: "bundle.[hash:8].js",
        // 绝对路径
        path: path.resolve("./build")
    },
    devServer: {
        contentBase: "./build",
        port: 8080,
        compress: true, //服务器压缩
        open: true,
        hot: true //热更新
    }, //开发服务器
    module: {
        rules: [
            // 从右往左写
            {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader", //启用style-loader
                    use: [
                        {loader: "css-loader"},
                        {loader: 'postcss-loader'}
                    ]
                })
            }
        ]
    },
    plugins: [
        // lessExtract,
        // cssExtract,
        new ExtractTextWebpackPlugin('css/index.css'),
        // new PurifycssWebpack({
        //     paths: glob.sync(path.resolve('src/*.html')),
        // }),
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(["./build"]),
        new HtmlWebpackPlugin({
            // filename: 'index.html',
            // chunks: ['index'],
            template: "./src/index.html",
            title: "产品销量统计",
            hash: true
        })
    ],
    mode: "development",
    resolve: {}
};