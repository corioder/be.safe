const path = require("path");

const { DefinePlugin } = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const { VueLoaderPlugin } = require("vue-loader");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const WebpackBar = require("webpackbar");

module.exports = (env = {}) => ({
  context: path.resolve(__dirname, "src"),
  mode: "development",
  stats: "minimal",

  entry: {
    app: path.resolve(__dirname, "app/client/index.js"),
  },

  output: {
    path: path.resolve(__dirname, "dev"),
    filename: "index.js",
    publicPath: process.env.BASE_URL,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: true,
        },
      },
      {
        test: /\.js$/,
        exclude: [/node_modules\/(webpack|html-webpack-plugin)/, /node_modules\/core-js.*/],
        loader: "babel-loader",
        options: { cacheDirectory: true },
      },
      {
        test: /\.s[ac]ss$|\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.production },
          },
          "css-loader",

          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  require("postcss-import")(),
                  require("postcss-preset-env")({
                    stage: 0,
                  }),
                ],
              },
            },
          },

          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "app/client/public/index.html"),
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
    new DefinePlugin({
      __VUE_OPTIONS_API__: true,
      __VUE_PROD_DEVTOOLS__: false,
      __IS_DEV__: true,
    }),
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
          name: (module) => {
            const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
            if (packageName[0] == ".") return `z${packageName.replace("@", "")}`;
            else return `z.${packageName.replace("@", "")}`;
          },
        },
      },
    },
  },

  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "src/public"),
    publicPath: "/",
    index: "./index.html",
    hot: true,
    writeToDisk: true,
    clientLogLevel: "error",
    overlay: {
      warnings: true,
      errors: true,
    },
    historyApiFallback: true,
  },
});
