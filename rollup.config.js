import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import pkg from './package.json';

export default
	// browser-friendly UMD build
	// {
	// 	input: 'src/bundle.js',
	// 	output: {
  //     name: 'app',
  //     file: 'dist/bundle.js',
	// 		format: 'umd'
	// 	},
	// 	plugins: [
	// 		resolve(), // so Rollup can find `ms`
	// 		commonjs(), // so Rollup can convert `ms` to an ES module
	// 		babel({
	// 			exclude: ['node_modules/**']
	// 		})
	// 	]
  // },
  {
		input: 'src/vendor.js',
		output: {
      name: 'venall',
      file: 'dist/vendor.js',
			format: 'iife'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
      commonjs(), // so Rollup can convert `ms` to an ES module
      // babel({
      //   exclude: ['node_modules/**']
      // })
		]
	}
