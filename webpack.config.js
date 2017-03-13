const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); 
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});


module.exports = {
  entry: "./src/script.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js",
  },
  module: {
    //loaders: {
    //  
    //}
    rules: [{
      test: /\.scss$/,
      include: [
        path.resolve(__dirname, "src")
      ],
      use: extractSass.extract({
        use: [
          { loader: "css-loader", options: { minimize: true } },
          { loader: "sass-loader" }
        ],
        fallback: "style-loader"
      })
    }]
  },
  plugins: [
    extractSass,
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
}
