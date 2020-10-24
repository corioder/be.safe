const path = require('path');
require('dotenv').config();
const package = require('./package.json');


const common = require('./webpack.common.js');

const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const WebpackBar = require('webpackbar');

const API = process.env.API || package.defaults.API;
const STRAPI = process.env.STRAPI || package.defaults.STRAPI;

module.exports = (env = {}) => ({
	...common,
	mode: 'development',
	devtool: 'source-map',
	stats: 'minimal',

	output: {
		path: path.resolve(__dirname, 'dev'),
		filename: 'index.js',
		publicPath: '/',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					hotReload: true,
				},
			},
			{
				test: /\.js$/,
				exclude: [/node_modules\/(webpack|html-webpack-plugin)/, /node_modules\/core-js.*/s],
				loader: 'babel-loader',
				options: { cacheDirectory: true },
			},
			{
				test: /\.s[ac]ss$|\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { hmr: !env.production },
					},
					'css-loader',

					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [require('postcss-import')(), require('postcss-preset-env')(), require('autoprefixer')()],
							},
						},
					},

					'sass-loader',
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets',
					name: '[path][name].[ext]',
					esModule: false,
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			favicon: path.resolve(__dirname, 'app/client/assets/favicons/icon-32x32.ico'),
			template: path.resolve(__dirname, 'app/client/public/index.html'),
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
		}),
		new WebpackBar(),
		new VueLoaderPlugin(),
		new DefinePlugin({
			__IS_DEV__: true,
			__API__: `"${API}"`,
			__STRAPI__: `"${STRAPI}"`,

			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
		}),
	],

	optimization: {
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: Infinity,
			minSize: 0,
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
					name: (module) => {
						const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
						if (packageName[0] == '.') return `z${packageName.replace('@', '')}`;
						else return `z.${packageName.replace('@', '')}`;
					},
				},
			},
		},
	},

	devServer: {
		contentBase: path.join(__dirname, 'src/public'),
		publicPath: '/',
		index: './index.html',
		hot: true,
		writeToDisk: true,
		clientLogLevel: 'error',
		overlay: {
			warnings: false,
			errors: true,
		},
		historyApiFallback: true,
		host: process.env.HOST,
	},
});
