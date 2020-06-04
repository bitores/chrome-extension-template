const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ChromeReloadPlugin = require('wcer2')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");//用来抽离单独抽离css文件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//压缩css插件
{{#if components.locales}}
const GenerateLocaleJsonPlugin = require('./GenerateLocaleJsonPlugin')
{{/if}}
const { cssLoaders, htmlPage } = require('./tools')


const rootDir = path.resolve(__dirname, '..')
let resolve = (dir) => path.join(rootDir, 'src', dir)

module.exports = {
  mode: 'production',
  entry: {
    {{#if components.popupTab}}
    popup: resolve('./popup'),
    tab: resolve('./tab'),
    {{/if}}
    {{#if components.optionPage}}
    options: resolve('./options'),
    {{/if}}
    {{#if components.contentScript}}
    content: resolve('./content'),
    {{/if}}
    {{#if components.devtool}}
    devtools: resolve('./devtools'),
    panel: resolve('./devtools/panel'),
    {{/if}}
    {{#if components.background}}
    background: resolve('./background'),
    {{/if}}
  },
  output: {
    path: path.join(rootDir, 'dist'),
    publicPath: '/',
    filename: 'js/[name].js',
    chunkFilename: 'js/[id].[name].js?[hash]',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules:[
      {
        test:  /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true,
          loaders: {
            ...cssLoaders({extract:false}),
            js: { loader: 'babel-loader' }
          },
          transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      }, {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader', 'less-loader' ]
        })
    
      }, {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.join(rootDir, 'src'),
        ]
      }, {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash:7].[ext]'
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),//抽离出来以后的css文件名称
        new OptimizeCssAssetsPlugin(),//执行压缩抽离出来的css
    new CleanWebpackPlugin(['*'], { root: path.join(rootDir, 'dist') }),
    // Customize your extension structure.
    {{#if components.popupTab}}
    htmlPage('tab', 'tab', ['commons', 'vendors', 'tab']),
    htmlPage('popup', 'popup', ['commons', 'vendors', 'popup']),
    {{/if}}
    {{#if components.devtool}}
    htmlPage('panel', 'panel', ['commons', 'vendors', 'panel']),
    htmlPage('devtools', 'devtools', ['commons', 'vendors', 'devtools']),
    {{/if}}
    {{#if components.optionPage}}
    htmlPage('options', 'options', ['commons', 'vendors', 'options']),
    {{/if}}
    {{#if components.background}}
    htmlPage('background', 'background', ['commons', 'vendors', 'background']),
    {{/if}}
    // End customize
    new CopyWebpackPlugin([{ from: path.join(rootDir, 'config', 'icons'), to: path.join(rootDir, 'dist', 'icons') }]),
    new ChromeReloadPlugin({
      port: 9090,
      manifest: path.join(rootDir, 'config', 'manifest.js')
    }),
    {{#if components.locales}}
    new GenerateLocaleJsonPlugin({
      _locales: path.join(rootDir, 'conifg', '_locales')
    }),
    {{/if}}
  ],
  optimization: {
    splitChunks: {
  
      chunks: "all",          //async异步代码分割 initial同步代码分割 all同步异步分割都开启
      minSize: 30000,         //字节 引入的文件大于30kb才进行分割
      //maxSize: 50000,         //50kb，尝试将大于50kb的文件拆分成n个50kb的文件
      minChunks: 1,           //模块至少使用次数
      maxAsyncRequests: 5,    //同时加载的模块数量最多是5个，只分割出同时引入的前5个文件
      maxInitialRequests: 3,  //首页加载的时候引入的文件最多3个
      automaticNameDelimiter: '~', //缓存组和生成文件名称之间的连接符
      name: true,                  //缓存组里面的filename生效，覆盖默认命名
      cacheGroups: { //缓存组，将所有加载模块放在缓存里面一起分割打包
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: "commons",
          chunks: "initial",
          minSize: 0,
          minChunks: 2,
          priority: 1, // 优先级，默认是0，可以为负数
          filename: 'js/commons.js'
        },
        vendors: {  //自定义打包模块
          test: /[\\/]node_modules[\\/]/,
          priority: -10, //优先级，先打包到哪个组里面，值越大，优先级越高
          minSize: 0,
          chunks: 'all',
          name: 'vendors',
          filename: 'js/vendors.js',
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
      
    }
  }
};