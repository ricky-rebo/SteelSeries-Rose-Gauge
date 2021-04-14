// Generated using webpack-cli http://github.com/webpack-cli
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
	//mode: 'development',
	devtool: 'source-map',
	entry: './src/index.ts',
	output: {
		path: path.resolve(__dirname, 'dist'),
    filename: 'steelseries-rose.js',
    library: 'steelseriesRose',
    libraryTarget: 'umd'
	},
	plugins: [
		new ESLintPlugin({ extensions: ["js", "ts"] })
	],
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.tsx?$/,
				loader: 'ts-loader',
				exclude: ['/node_modules/'],
			}
		],
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
};
