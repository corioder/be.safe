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
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const WebpackBar = require('webpackbar');

const iconsPwa = path.resolve(__dirname, 'app/assets/iconsPwa');

const API = process.env.API || package.defaults.API;
const STRAPI = process.env.STRAPI || package.defaults.STRAPI;

module.exports = (env = {}) => ({
	...common,
	mode: 'production',

	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[contenthash].js',
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
							name: '[contenthash].[ext]',
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
					name: '[contenthash].[ext]',
					esModule: false,
				},
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'app/public/index.html'),
			favicon: path.resolve(__dirname, 'app/assets/favicon.ico'),
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
			filename: '[contenthash].css',
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
			swDest: 'sw.js',
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
			inject: true,
			start_url: '.',
			name: 'be.safe',
			short_name: 'be.safe',
			description: 'Bądź bezpieczny w czasie pandemii COVID-19',
			background_color: '#ffffff',
			theme_color: '#fdfffc',
			filename: 'manifest.json',
			orientation: 'portrait',
			display: 'standalone',
			ios: {
				'apple-mobile-web-app-title': 'be.safe',
				'apple-mobile-web-app-status-bar-style': '#011627',
			},

			icons: [
				{
					src: path.resolve(iconsPwa, 'maskable_icon.png'),
					sizes: '1024x1024',
					purpose: 'maskable',
				},
				{
					src: path.resolve(iconsPwa, 'icon-32x32.png'),
					size: '32x32',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-36x36.png'),
					size: '36x36',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-48x48.png'),
					size: '48x48',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-72x72.png'),
					size: '72x72',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-96x96.png'),
					size: '96x96',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-120x120.png'),
					size: '120x120',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-128x128.png'),
					size: '128x128',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-144x144.png'),
					size: '144x144',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-152x152.png'),
					size: '152x152',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-180x180.png'),
					size: '180x180',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-192x192.png'),
					size: '192x192',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-384x384.png'),
					size: '384x384',
					ios: true,
				},
				{
					src: path.resolve(iconsPwa, 'icon-512x512.png'),
					size: '512x512',
					ios: true,
				},
			],
		}),
	],

	optimization: {
		minimize: true,
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
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
