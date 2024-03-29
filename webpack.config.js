var debug = process.env.NODE_ENV !== "production";
var path = require('path');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  //context: path(__dirname,), 
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./src/scripts.js",
  mode: 'development',
  plugins:  [
     new HtmlWebpackPlugin({
      template: './src/index.html',
      inject: true,
    }),
    new MiniCssExtractPlugin({filename: "assets/style.min.css", }),   
      ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,}),
      new OptimizeCSSAssetsPlugin({})
    ]
  },    
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',       
      },
      {
        test: /\.sass$/,
        use: [
         MiniCssExtractPlugin.loader,
         "css-loader",
         "sass-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'assets',
              name: '[name].[ext]',
            },
          },
        ],
      },    
    ]
  },
  output: {
    path: __dirname + '/build',
    filename: "scripts.min.js",
    publicPath: '/',
     },
  devServer: {    
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    compress: true,
    host: 'localhost',
    port: 8000,
    open: true,
  },
    
};
