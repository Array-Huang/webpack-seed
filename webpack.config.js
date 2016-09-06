/* 依赖关系 Start */
  var webpack = require('webpack');
  var path = require('path');
  var HtmlWebpackPlugin = require('html-webpack-plugin');
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  var precss = require('precss');
  var autoprefixer = require('autoprefixer');
/* 依赖关系 End */
/* 目录变量 Start */
  var staticRootDir = __dirname;

  // 源文件目录
  var vendorDir = path.resolve(staticRootDir, './vendor');
  var pagesDir = path.resolve(staticRootDir, './src/pages');
  var publicDir = path.resolve(staticRootDir, './src/public-resource');
  var logicDir = path.resolve(publicDir, './logic');
  var libsDir = path.resolve(publicDir, './libs');
  var configDir = path.resolve(publicDir, './config');
  // var componentsDir = path.resolve(publicDir, './components');
  var layoutDir = path.resolve(publicDir, './layout');

  // 生成文件目录
  var buildDir = path.resolve(staticRootDir, './build');
  // 分块读取目录

/* 目录变量 End */
/* webpack的plugin Start */
  // 全局shimming
  var providePlugin = new webpack.ProvidePlugin({
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery',
    'window.$': 'jquery',
  });

  /*
    抽取出所有通用的部分
  */
  var commonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: 'commons',      // 需要注意的是，chunk的name不能相同！！！
    filename: '[name].bundle.js',
    minChunks: 4,
  });

/* webpack的plugin End */
/* 拼接config的各部分 Start */
  var pageArr = [
    'index/login',
    'index/index',
    'alert/index',
    'user/edit-password', 'user/modify-info',
  ];
  var configEntry = {};
  var configPlugins = [
    providePlugin,      // 全局shimming
    commonsChunkPlugin,
    new ExtractTextPlugin('[name]/styles.css'),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),   // 指定只加载zh-cn的locale包
  ];

  pageArr.forEach((page) => {
    configEntry[page] = path.resolve(pagesDir, page + '/page');
    const htmlPlugin = new HtmlWebpackPlugin({
      filename: `${page}/page.html`,
      template: path.resolve(pagesDir, `./${page}/html.js`),
      chunks: [page, 'commons'],
      hash: true, // 为静态资源生成hash值
    });
    configPlugins.push(htmlPlugin);
  });

/* 拼接config的各部分 End */
/* 正式集成配置 Start */
  module.exports = {
    // 入口文件(js)的源文件路径的配置，通常来说一个页面对应一个入口文件，但无硬性规定；在页面中通过<script>引入入口文件
    entry: configEntry,

    // 入口文件(js)的生成后文件路径的配置
    output: {
      path: buildDir,
      publicPath: '../../../../build/',
      filename: '[name]/entry.js',    // [name]表示entry每一项中的key，用以批量指定生成后文件的名称
      chunkFilename: '[id].bundle.js',
    },
    module: {
      preLoaders: [{
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [
          pagesDir, publicDir,
        ],
        exclude: [vendorDir, buildDir, /bootstrap/],
      }],
      // loader的配置
      loaders: [
        {
          test: require.resolve('jquery'),
          loader: 'expose?$!expose?jQuery',
        },
        {
          test: /\.css$/,
          exclude: /node_modules|bootstrap/,
          loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss'),
        },
        {
          test: /\.less$/,
          exclude: /node_modules|bootstrap/,
          loader: ExtractTextPlugin.extract('css?minimize&-autoprefixer!postcss!less'),
        },
        {
          test: /\.js$/,
          exclude: /node_modules|vendor|bootstrap/,
          loader: 'babel-loader',
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules|vendor|bootstrap/,
          loader: 'babel-loader',
        },
        {
          test: /\.html$/,
          exclude: /node_modules|vendor/,
          loader: 'html',
        },
        {
          test: /\.ejs$/,
          exclude: /node_modules|vendor/,
          loader: 'ejs',
        },
        {
          // 图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
          // 如下配置，将小于8192byte的图片转成base64码
          test: /\.(png|jpg|gif)$/,
          loader: 'url-loader?limit=8192&name=./static/img/[hash].[ext]',
        },
        {
          // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
          test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
          loader: 'file',
          query: {
            name: './static/fonts/[name].[ext]',
          },
        },
      ],
    },
    resolve: {
      // 模块别名的配置，为了使用方便，一般来说所有模块都是要配置一下别名的
      alias: {
        /* 各种目录 */
        iconfontDir: path.resolve(publicDir, 'iconfont/'),
        configDir: configDir,

        /* vendor */
        /* bootstrap 相关 */
        metisMenu: path.resolve(vendorDir, 'metisMenu/'),

        /* libs */
        withoutJqueryModule: path.resolve(libsDir, 'without-jquery.module'),
        routerModule: path.resolve(libsDir, 'router.module'),

        libs: path.resolve(libsDir, 'libs.module'),

        /* less */
        lessDir: path.resolve(publicDir, 'less'),

        /* components */

        /* layout */
        layout: path.resolve(layoutDir, 'layout/html'),
        'layout-without-nav': path.resolve(layoutDir, 'layout-without-nav/html'),

        /* logic */
        cm: path.resolve(logicDir, 'common.module'),
        cp: path.resolve(logicDir, 'common.page'),
        /* config */
        configModule: path.resolve(configDir, 'common.config'),
        bootstrapConfig: path.resolve(configDir, 'bootstrap.config'),
      },

      // 当require的模块找不到时，尝试添加这些后缀后进行寻找
      extentions: ['', 'js'],
    },
    // 插件的配置
    plugins: configPlugins,

    eslint: {
      configFile: path.resolve(__dirname, './.eslintrc'),
      failOnError: true,
    },

    postcss() {
      return [precss, autoprefixer({
        remove: false,
        browsers: ['ie >= 8', '> 1% in CN'],
      })];
    },
  };
/* 正式集成配置 End */
