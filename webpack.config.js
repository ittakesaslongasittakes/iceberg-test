"use strict";

const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

require("es6-promise").polyfill();

module.exports = {
  entry: "./src/index.js",

  output: {
    path: __dirname,
    filename: "dist/js/app.js"
  },

  plugins: [
    // Specify the resulting CSS filename
    new ExtractTextPlugin({
      filename: "dist/css/app.css",
      allChunks: true,
      disable: process.env.NODE_ENV !== "production"
    })
  ],

  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          "webpack-append?import Snabbdom from 'snabbdom-pragma'" // TODO: set only for jsx ex. in prod.
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          "file-loader",
          {
            loader: "image-webpack-loader",
            options: {
              disable: true // webpack@2.x and newer
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"]
        })
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx"]
  },

  devServer: {
    port: 3001,
    historyApiFallback: true
  }
};
