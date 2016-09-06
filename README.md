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
- 整合iconfont（http://www.iconfont.cn/）作为字体图标方案，需要什么图标就自己上iconfont那打包下载下来，替换掉`src/public-resource/iconfont`内的文件。

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