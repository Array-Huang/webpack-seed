# webpack-seed

## 项目介绍
本项目是一个利用webpack架构的**web app**脚手架，其特点如下：
- 更适合多页应用。
- 既可实现全后端分离，也可以生成后端渲染所需要的模板。
- 引入layout和component的概念，方便多页面间对布局、组件的重用，妈妈再也不用担心我是选SPA呢还是Iframe了，咱们都！不！需！要！
- 编译后的程序不依赖于外部的资源（包括css、font、图片等资源都做了迁移），可以整体放到CDN上。
- 已整合兼容IE8+的跨域方案。
- 整合Bootstrap3(利用webpack按需打包)及主题SB-Admin，但其实换掉也很简单，或者干脆不用CSS框架也行。
- 不含Js框架（jQuery不算框架，谢谢）。在我原本的项目中，是用avalon2作为Js框架的，但考虑到脚手架本身并不需要Js框架，同时我也希望这个项目保持精简，因此决定剔除掉avalon2的部分。
- 整合[iconfont][1]作为字体图标方案，需要什么图标就自己上iconfont那打包下载下来，替换掉`src/public-resource/iconfont`内的文件。

## 使用说明
- 全局安装webpack和webpack-dev-server，如果已经装过那可以跳过这一步
```bash
$ npm install --global webpack webpack-dev-server
```

- 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```
$ npm install
```

- 编译程序，生成的所有代码在`build`目录内。
```
$ npm run build # 生成生产环境的代码。用npm run watch或npm run dev可生成开发环境的代码
```

- 启动服务器，推荐直接使用webpack-dev-server
```
$ npm run start
```

- 打开浏览器，在地址栏里输入`http://localhost:8080`，Duang！页面就出来了！

## CLI命令(npm scripts)
| 命令            | 作用&效果          |
| --------------- | ------------- |
| npm run build   | 根据`webpack.config.js`，build出一份生产环境的代码 |
| npm run dev     | 根据`webpack.dev.config.js`，build出一份开发环境的代码 |
| npm run watch   | 在`npm run dev`的基础上添加`-- watch`，实时监控源文件，建议开发时使用这项 |
| npm run start   | 开启webpack-dev-server，然后就可以在 http://localhost:8080/ 查看成品了 |
| npm run profile | 显示编译过程中每一项资源的耗时，用来调优的 |
| npm run dll     | 生成Dll文件，每次升级第三方库时都需要重新执行一遍 |

## 目录结构说明
```
├─build # 编译后生成的所有代码、资源（图片、字体等，虽然只是简单的从源目录迁移过来）
├─node_modules # 利用npm管理的所有包及其依赖
├─vendor # 所有不能用npm管理的第三方库
├─.babelrc # babel的配置文件
├─.eslintrc # ESLint的配置文件
├─index.html # 仅作为重定向使用
├─package.json # npm的配置文件
├─webpack-config # 存放分拆后的webpack配置文件
│   ├─base # 主要是存放一些变量
│   ├─inherit # 存放生产环境和开发环境相同的部分，以供继承
│   └─vendor # 存放webpack兼容第三方库所需的配置文件
├─webpack.config.js # 生产环境的webpack配置文件（无实质内容，仅为组织整理）
├─webpack.dev.config.js # 开发环境的webpack配置文件（无实质内容，仅为组织整理）
├─src # 当前项目的源码
    ├─pages # 各个页面独有的部分，如入口文件、只有该页面使用到的css、模板文件等
    │  ├─alert # 业务模块
    │  │  └─index # 具体页面
    │  ├─index # 业务模块
    │  │  ├─index # 具体页面
    │  │  └─login # 具体页面
    │  │      └─templates # 如果一个页面的HTML比较复杂，可以分成多块再拼在一起
    │  └─user # 业务模块
    │      ├─edit-password # 具体页面
    │      └─modify-info # 具体页面
    └─public-resource # 各个页面使用到的公共资源
        ├─components # 组件，可以是纯HTML，也可以包含js/css/image等，看自己需要
        │  ├─footer # 页尾
        │  ├─header # 页头
        │  ├─side-menu # 侧边栏
        │  └─top-nav # 顶部菜单
        ├─config # 各种配置文件
        ├─iconfont # iconfont的字体文件
        ├─imgs # 公用的图片资源
        ├─layout # UI布局，组织各个组件拼起来，因应需要可以有不同的布局套路
        │  ├─layout # 具体的布局套路
        │  └─layout-without-nav # 具体的布局套路
        ├─less # less文件，用sass的也可以，又或者是纯css
        │  ├─base-dir
        │  ├─components-dir # 如果组件本身不需要js的，那么要加载组件的css比较困难，我建议可以直接用less来加载
        │  └─base.less # 组织所有的less文件
        ├─libs # 与业务逻辑无关的库都可以放到这里
        └─logic # 业务逻辑
```

## 更新日志

### 2.0.0 (2016-10-21)
把基础设施从项目里抽离出来，实现多项目共用同一套架构/基础设施。由于本项目肩负有教程示例的责任，且2.x版本变化极大，因此另辟一个新repo（[Array-Huang/webpack-seed-v2](https://github.com/Array-Huang/webpack-seed-v2)）来放置。

### 1.2.2 (2016-10-16)
考虑到多个页面可能会共用html/js/css（例如**添加页面**和**修改页面**），在自动查找页面入口时，忽略以`_`开头的目录，因此，可以使用以`_`开头的目录来放置页面复用的资源。

### 1.2.0 (2016-10-14)
利用[`isaacs/node-glob`](https://github.com/isaacs/node-glob)根据约定好的文件目录结构自动查找页面入口，取代过去手动指定的做法（但如果在调试过程中希望只编译某些页面，仍然可以通过手动指定来实现）。

### 1.1.0
引入Dll的概念，将第三方库进行预打包，那么在打包我们的业务代码的时候，就不需要重复打包这些第三方库了。这尤其能提现在bootstrap上，可以省一大半的时间。
- 如果修改了Dll所包含的第三方库，比如说升级之类的，请使用`npm run dll`重新打包Dll文件。注意：系统会在打包Dll前先清空Dll目录。
- 如果重新打包了Dll，那么也请重新打包你的业务代码，使用`npm run build`或`npm run dev`。

### 1.0.2
- 编译文件前先清空build目录。
- 分拆webpack配置文件，避免配置文件日益臃肿。
- 分开生产环境和开发环境的webpack配置文件。其中，`npm run build`会调用生产环境的webpack配置文件(webpack.config.js)，而`npm run dev`和`npm run watch`会调用开发环境的配置文件。

### 1.0.0
由于本脚手架是直接从我负责的项目中提炼出来的，因此已具备投入生产环境的能力，故直接定义版本号为1.0.0

  [1]: http://www.iconfont.cn/