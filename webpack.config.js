/*
* @Author: chenyawei1227
* @Date:   2017-07-08 19:41:11
* @Last Modified by:   chenyawei1227
* @Last Modified time: 2018-01-27 16:52:26
*/
var webpack           = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

//环境变量配置 dev / online
var WEBPACK_ENV       = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html-webpack-plugin参数的方法
var getHtmlConfig = function(name,title){
    return {
        template    : './src/view/'+ name +'.html',
            filename    : 'view/'+ name +'.html',
            inject      : true,
            title       : title,
            hash        : true,
            chunks      : ['common', name]
    };
};
//webpack config
var config = {
     entry: {
        'common'      : ['./src/page/common/index.js'],
     	'index'       : ['./src/page/index/index.js'],
     	'login'       : ['./src/page/login/index.js'],
        'result'      : ['./src/page/result/index.js']
     },
     output: {
         path: './dist',
         publicPath : '/dist',
         filename: 'js/[name].js'
     },
     externals : {
     	'jquery' : 'window.jQuery'
     },
     module: {
        loaders: [
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
            //gif|png|jpg|图片格式；woff|svg|eot|ttf|字体样式
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]'},
            { test: /\.string$/, loader: 'html-loader'}
        ],
     },
     resolve : {
        alias : {
            node_modules       : __dirname + '/node_modules',
            util               : __dirname + '/src/util',
            page               : __dirname + '/src/page',
            service            : __dirname + '/src/service',
            image              : __dirname + '/src/image'
        }
     },
     plugins:[
        //独立通用模块到js/base.js
     	new webpack.optimize.CommonsChunkPlugin({
     		name : 'common',
     		filename : 'js/base.js'
     	}),
        //把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        //html模版的处理
        new HtmlWebpackPlugin(getHtmlConfig('index',    '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('login',    '用户登录')),
        new HtmlWebpackPlugin(getHtmlConfig('result',   '操作结果')),
     ]
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088');
 };

 module.exports = config;


