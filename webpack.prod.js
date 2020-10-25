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

const WebpackPwaManifest = require('webpack-pwa-manifest');
const WorkboxPlugin = require('workbox-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const WebpackBar = require('webpackbar');

const API = process.env.API || package.defaults.API;
const STRAPI = process.env.STRAPI || package.defaults.STRAPI;

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
			template: path.resolve(__dirname, 'app/public/index.html'),
			favicon: path.resolve(__dirname, 'app/assets/favicons/icon_36x36.svg'),
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

			__VUE_OPTIONS_API__: true,
			__VUE_PROD_DEVTOOLS__: false,
		}),
		new WorkboxPlugin.GenerateSW({
			runtimeCaching: [
				{
					handler: 'CacheFirst',
					urlPattern: new RegExp(`${API}|${STRAPI}|${package.defaults.others.join('|')}`),
					options: {
						cacheName: 'API',
						expiration: {
							// half an hour
							maxAgeSeconds: 60 * 30,
						},
					},
				},
			],
		}),
		new WebpackPwaManifest({
			fingerprints: false,
			start_url: '.',
			name: 'be.safe',
			short_name: 'be.safe',
			description: 'Bądź bezpieczny w czasie pandemii COVID-19',
			background_color: '#ffffff',
			filename: 'manifest.json',
			orientation: 'portrait',
			display: 'standalone',
			ios: {
				'apple-mobile-web-app-title': 'be.safe',
				'apple-mobile-web-app-status-bar-style': '#011627',
			},
			// icons: [
			// 	{
			// 		src: path.resolve(__dirname, 'app/assets/favicons/icon.svg'),
			// 		sizes: [36, 48, 72, 96, 144, 192, 512],
			// 		ios: true,
			// 	},
			// ],
			icons: [
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_36x36.svg'),
					size: '36x36',
					ios: true,
				},
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_48x48.svg'),
					size: '48x48',
					ios: true,
				},
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_72x72.svg'),
					size: '72x72',
					ios: true,
				},
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_96x96.svg'),
					size: '96x96',
					ios: true,
				},
				// {
				// 	src: path.resolve(__dirname, 'app/assets/favicons/icon_120x120.svg'),
				// 	size: '120x120',
				// 	ios: true,
				// },
				// {
				// 	src: path.resolve(__dirname, 'app/assets/favicons/icon_128x128.svg'),
				// 	size: '128x128',
				// 	ios: true,
				// },
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_144x144.svg'),
					size: '144x144',
					ios: true,
				},
				// {
				// 	src: path.resolve(__dirname, 'app/assets/favicons/icon_152x152.svg'),
				// 	size: '152x152',
				// 	ios: true,
				// },
				// {
				// 	src: path.resolve(__dirname, 'app/assets/favicons/icon_180x180.svg'),
				// 	size: '180x180',
				// 	ios: true,
				// },
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_192x192.svg'),
					size: '192x192',
					ios: true,
				},
				// {
				// 	src: path.resolve(__dirname, 'app/assets/favicons/icon_384x384.svg'),
				// 	size: '384x384',
				// ios: true,
				// },
				{
					src: path.resolve(__dirname, 'app/assets/favicons/icon_512x512.svg'),
					size: '512x512',
					ios: 'startup',
				},
			],
			inject: true,
			// publicPath: null,
			// includeDirectory: true,
			// ?crossorigin: 'use-credentials',
		}),
		// new MinifyPlugin(null, { sourceMap: false }),
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
