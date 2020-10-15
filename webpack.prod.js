const common = require("./webpack.common.js");

const path = require("path");

const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

const ManifestPlugin = require("webpack-manifest-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const MinifyPlugin = require("babel-minify-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const WebpackBar = require("webpackbar");

let fileLoaderIndex = -1;
module.exports = (env = {}) => ({
  ...common,
  mode: "production",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[id].js",
    publicPath: "/",
    jsonpFunction: "a"
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          optimizeSSR: true
        }
      },
      {
        test: /\.js$/,
        exclude: [/node_modules\/(webpack|html-webpack-plugin)/, /node_modules\/core-js.*/],
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$|\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.production }
          },
          "css-loader",

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-import")(),
                  require("postcss-preset-env")({
                    stage: 0
                  })
                ]
              }
            }
          },

          "sass-loader"
        ]
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets",
              name: () => {
                fileLoaderIndex++;
                return `${fileLoaderIndex}.[ext]`;
              },
              esModule: false
            }
          },
          {
            loader: "svgo-loader"
          }
        ]
      },

      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: "file-loader",
        options: {
          outputPath: "assets",
          name: () => {
            fileLoaderIndex++;
            return `${fileLoaderIndex}.[ext]`;
          },
          esModule: false
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/client/public/index.html"),
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[id].css"
    }),
    new OptimizeCssAssetsPlugin(),
    new WebpackBar(),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __IS_DEV__: false
    }),
    new WorkboxPlugin.GenerateSW(),
    // new ManifestPlugin({
    //   seed: { assets: {}, brands: {} }
    // })
    new MinifyPlugin(null, { sourceMap: false })
  ],

  optimization: {
    runtimeChunk: "single",
    splitChunks: {
      chunks: "all",
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
          name: module => {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            return packageName;
          }
        }
      }
    }
  }
});
