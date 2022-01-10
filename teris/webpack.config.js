const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  entry: "./src/index.ts", // 启动文件
  mode: "development",
  output: {
    path: path.resolve("./dist"), // 出口文件的根目录,路径需要写成绝对路径,通过path.resolve函数进行转换。
    filename: "script/bundle.js", // 将打包的结果放到script文件夹下，bundle.js中。
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 以这个html文件为模板进行打包
    }), // 使用plugin插件
    new CleanWebpackPlugin(), // 清理原有的打包文件
  ],
  resolve: {
    extensions: [".ts", ".js"], // 查找解析的模块,后缀名为ts或js
  },
  module: {
    rules: [
      {
        test: /.ts$/, // 这是一个正则，以ts结尾的文件
        // loader: "ts-loader", // 交给ts-loader来处理，因为webpack是不认识ts文件的。
        use:{
          loader:"ts-loader",
          options:{
            transpileOnly:true
            // webpack-dev-server 和 ts-loader 连用，需要配置transpileOnly:true
          }
        }   
      },
    ],
  },
};
