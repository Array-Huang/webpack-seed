# webpack-seed

## 项目介绍
本项目是一个利用webpack架构的多页**web app**脚手架，其特点如下：
- 既可实现全后端分离，也可以生成后端渲染所需要的模板。
- 引入layout和component的概念，方便页面布局、组件的重用，妈妈再也不用担心我是选SPA呢还是Iframe了，咱们都！不！需！要！
- 编译后的程序不依赖于外部的资源，可以整体放到CDN上

## 使用说明

 1. 本项目使用包管理工具NPM，因此需要先把本项目所依赖的包下载下来：
```
$ npm install --no-optional
```

 2. 编译程序，生成的所有代码在`build`目录内。
```
$ npm run build # 有需要的话也可以用 npm run watch
```

 3. 启动服务器，推荐直接使用webpack-dev-server
```
$ webpack-dev-server
```

 4. 打开浏览器，在地址栏里输入`http://localhost:8080`，Duang！页面就出来了！