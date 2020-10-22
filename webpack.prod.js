const fs = require('fs');
const path = require('path');

if (process.env.USE_DOTENV == 'true') {
	require('dotenv').config();
} else if (process.env.USE_DOTENV == 'false') {
	if (fs.existsSync(path.resolve(__dirname, '.prod.env'))) require('dotenv').config({ path: '.prod.env' });
}
const package = require('./package.json');

const common = require('./webpack.common.js');

const { DefinePlugin } = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');

const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const WebpackBar = require('webpackbar');

const API = process.env.API || package.defaults.API;
const STRAPI = process.env.STRAPI || package.defaults.STRAPI;
const TWITTER = process.env.TWITTER || package.defaults.TWITTER;

let fileLoaderIndex = -1;
module.exports = (env = {}) => ({
	...common,
	mode: 'production',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[id].js',
		publicPath: '/',
		jsonpFunction: 'a',
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					optimizeSSR: true,
				},
			},
			{
				test: /\.js$/,
				exclude: [/node_modules\/(webpack|html-webpack-plugin)/, /node_modules\/core-js.*/s],
				loader: 'babel-loader',
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
				test: /\.svg$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							outputPath: 'assets',
							name: () => {
								fileLoaderIndex++;
								return `${fileLoaderIndex}.[ext]`;
							},
							esModule: false,
						},
					},
					{
						loader: 'svgo-loader',
					},
				],
			},

			{
				test: /\.(png|jpe?g|gif)$/i,
				loader: 'file-loader',
				options: {
					outputPath: 'assets',
					name: () => {
						fileLoaderIndex++;
						return `${fileLoaderIndex}.[ext]`;
					},
					esModule: false,
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'app/client/public/index.html'),
			minify: {
				collapseWhitespace: true,
				removeComments: true,
				removeRedundantAttributes: true,
				removeScriptTypeAttributes: true,
				removeStyleLinkTypeAttributes: true,
				useShortDoctype: true,
			},
		}),
		new MiniCssExtractPlugin({
			filename: '[id].css',
		}),
		new OptimizeCssAssetsPlugin(),
		new WebpackBar(),
		new VueLoaderPlugin(),
		new DefinePlugin({
			__IS_DEV__: false,
			__API__: `"${API}"`,
			__STRAPI__: `"${STRAPI}"`,
			__TWITTER__: `"${TWITTER}"`,

			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
		}),
		new WorkboxPlugin.GenerateSW({
			runtimeCaching: [
				{
					handler: 'CacheFirst',
					urlPattern: new RegExp(`${API}|${STRAPI}`),
					options: {
						cacheName: 'API',
						expiration: {
							// half hour
							maxAgeSeconds: 60 * 30,
						},
					},
				},
			],
		}),
		new MinifyPlugin(null, { sourceMap: false }),
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
						return packageName;
					},
				},
			},
		},
	},
});
