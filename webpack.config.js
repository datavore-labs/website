const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const wpPlugins = [
	new ExtractTextPlugin('css/[name].min.css'),
	new webpack.IgnorePlugin(/vertx/)
];

//Gen env arg
const buildEnv = process.argv.filter(
	(arg, i, col) => i > 0 && col[i - 1] === '--env'
)[0] || 'localhost';

if (buildEnv === 'prod') {
	wpPlugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: false
			}),
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': '"production"'
		})
	);
} else {
	wpPlugins.push(
		new webpack.SourceMapDevToolPlugin({
			// exclude the index entry point
			exclude: /.*index.*$/,
			columns: false,
			filename: '[file].map[query]',
			lineToLine: false,
			module: false
		}),
		new webpack.HotModuleReplacementPlugin({
			multiStep: true
		})
	);
}

module.exports = {
	resolve: {
		alias: {
			//environment: path.resolve(process.cwd(), 'env', buildEnv),
			"TweenLite": path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
			"TweenMax": path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
			"TimelineLite": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
			"TimelineMax": path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
			"ScrollMagic": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
			"animation.gsap": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
			"debug.addIndicators": path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
		},
		extensions: ['', '.json', '.jsx', '.js']
	},
	module:	{
		loaders: [
			{ test: /\.js$/, exclude: /node_modules/, loaders: ['babel', 'imports?define=>false'] },
			{ test: /\.(ico|eot|woff|woff2|ttf|svg|png|jpg)(\?.*)?$/, loaders: ['file'], exclude: [path.resolve(__dirname, "src/images/icons")] },
			{ test: /\.svg$/, loader: 'svg-sprite?name=i-[name]', include: [path.resolve(__dirname, "src/images/icons")]},
			{ test: /\.(svg|png|jpg)$/, loader: 'file?name=/images/ui/[name].[ext]', include: [path.resolve(__dirname, "src/images/ui")]},
			{ test: /\.(svg|png|jpg)$/, loader: 'file?name=/images/favicon/[name].[ext]', include: [path.resolve(__dirname, "src/images/favicon")]},
			{ test: /\.tpl\.(pug|jade)$/, loaders: ['html?removeRedundantAttributes=false', 'jade-html'] },
			{ test: /\.pug$/, loaders: ['raw'] },
			{ test: /\.tpl\.html$/, loaders: ['html?removeRedundantAttributes=false'] },
			{ test: /[^\.][^t][^p][^l]\.(pug|jade)$/, loaders: ['file?name=[name].html', 'jade-html' ] },
			{ test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract('css-loader?minimize!postcss-loader!sass-loader') },
			{ test: /[^\.][^t][^p][^l]\.html$/, loaders: ['file?name=[name].[ext]'] }
		]
	},
	plugins: wpPlugins,
	entry: {
		app: [
			'babel-polyfill',
			'./images/favicon',
			'./images/ui',
			'./images/icons',
			'./main.scss',
			'./index.jade',
			'./main.js',
		]
	},
	output: {
		filename: '[name].bundle.js',
		path: path.resolve(process.cwd(), 'bin')
	},
	debug: true,
	context: path.resolve(process.cwd(), 'src'),
	devServer: {
		publicPath: '/',
		outputPath: '/',
		filename: 'app.bundle.js',
		watchOptions: undefined,
		watchDelay: undefined,
		contentBase: path.resolve(process.cwd(), 'src'),
		stats: {
			cached: false,
			cachedAssets: false,
			colors: true
		},
	}
};
