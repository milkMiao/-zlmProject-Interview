const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  // 入口
  entry: "./src/index.js",
  // loader
  module: {
    rules: [{ test: /\.txt$/, use: 'raw-loader' }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
};
