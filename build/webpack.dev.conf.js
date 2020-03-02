'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
// const express = require('express')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const express=require('express')
const app=express()//请求server数据
var appData=require('../db.json')//加载本地数据文件
var news=appData.getNewsList//获取json对象新闻信息
var products=appData.getProductList//获取json对象pc产品,手机应用类信息
var boards=appData.getBoardList//获取json对象board信息
var price=appData.getPrice//获取json对象价格信息
var orders=appData.getOrderList//获取json对象价订单信息
var buytypes=appData.getBuyTypes//获取json对象价产品类型信息
var versions=appData.getVersionList//获取json对象价产品版本信息
var periods=appData.getPeriodList//获取json对象价有效时间信息
var login=appData.getLogin//获取json对象登录信息
var apiRoutes=express.Router()//设置路由
app.use('/api',apiRoutes)//设置路由路径
app.listen(3000, () => {
  console.log('JSON Server is running')
})

// /*----------------jsonServer---------*/
// /*引入json-server*/
// var jsonServer = require('json-server')

// // var jsonServer=new jsonServer()
// /*搭建一个server*/
// var apiServer = jsonServer.create()
// /*将db.json关联到server*/
// var apiRouter = jsonServer.router('db.json')
// var middlewares = jsonServer.defaults()
// apiServer.use(middlewares)
// apiServer.use(apiRouter)
// /*监听端口*/
// apiServer.listen(3000, () => {
//   console.log('JSON Server is running')
// })
// /*----------------jsonServer---------*/


const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
    before(app){
      app.get('/api/news',(req,res)=>{
        res.json({
          errno:0,
          data:news
        })//接口返回json数据，上面配置的数据news就赋值给data请求后调用
      }),
      app.get('/api/products',(req,res)=>{
        res.json({
          errno:0,
          data:products
        })//接口返回json数据，上面配置的数据products就赋值给data请求后调用
      }),
      app.get('/api/boards',(req,res)=>{
        res.json({
          errno:0,
          data:boards
        })//接口返回json数据，上面配置的数据boards就赋值给data请求后调用
      }),
      app.get('/api/price',(req,res)=>{
        res.json({
          errno:0,
          data:price
        })//接口返回json数据，上面配置的数据price就赋值给data请求后调用
      }),
      app.get('/api/orders',(req,res)=>{
        res.json({
          errno:0,
          data:orders
        })//接口返回json数据，上面配置的数据orders就赋值给data请求后调用
      }),
      app.get('/api/buytypes',(req,res)=>{
        res.json({
          errno:0,
          data:buytypes
        })//接口返回json数据，上面配置的数据buytypes就赋值给data请求后调用
      }),
      app.get('/api/versions',(req,res)=>{
        res.json({
          errno:0,
          data:versions
        })//接口返回json数据，上面配置的数据versions就赋值给data请求后调用
      }),
      app.get('/api/periods',(req,res)=>{
        res.json({
          errno:0,
          data:periods
        })//接口返回json数据，上面配置的数据periods就赋值给data请求后调用
      }),
      app.get('/api/login',(req,res)=>{
        res.json({
          errno:0,
          data:login
        })
      })
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
