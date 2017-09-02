module.exports = {
  contentBase: './build/',
  host: 'localhost',
  port: 8081, // 默认8080
  inline: true, // 可以监控js变化
  hot: true, // 热启动
  compress: true,
  watchContentBase: false,
};
