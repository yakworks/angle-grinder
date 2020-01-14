// TESTING PROOF ON CONCEPT, NOT WORKING

var webpackConfig = require('./config/webpack.test.js');
var babel = require('rollup-plugin-babel')
var resolve = require('@rollup/plugin-node-resolve')
var commonjs = require('@rollup/plugin-commonjs')
//webpackConfig.entry = {};

// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    basePath: '',

    frameworks: [ "mocha", "sinon-chai" ],

    files: [
      //{ pattern: "node_modules/jquery/dist/jquery.js", watched: false },
      //{ pattern: "node_modules/lodash/lodash.js"},
      //TESTS, for now we can list them while converting but will be blanket 'tests/unit/**/*.js' when done
      //only works one 'package' at a time like this
      // each file acts as entry point for the webpack configuration and it will load angular twice
      //{ pattern: 'tests/unit/angleGrinder/select2/**/*.js', watched: false,   included: false },
      //{ pattern: 'tests/unit/angleGrinder/common/commonSpec.js', watched: false },
      // 'src/vendor.js',
      // "node_modules/angular-mocks/angular-mocks.js",
      // 'tests/unit/angleGrinder/**/*.js'
      //'tests/tests.entry.js'
      //{ pattern: 'src/vendor.js', watched: false, included:false },
      { pattern: "node_modules/jquery/dist/jquery.js", watched: false},
      { pattern: "node_modules/lodash/lodash.js"},
      { pattern: "dist/vendor.js", watched: false},
      { pattern: "node_modules/angular-mocks/angular-mocks.js", watched: false},
      //{ pattern: 'tests/unit/angleGrinder/alerts/*.js', watched: false },
      //{ pattern: 'tests/unit/angleGrinder/common/checkMarkFilterSpec.js', watched: false },
      { pattern: 'tests/unit/angleGrinder/pathWithContext/*.js', watched: false },
      { pattern: 'tests/unit/angleGrinder/resourceSupport/*.js', watched: false },
      { pattern: 'tests/unit/angleGrinder/select2/*.js', watched: false },
      { pattern: 'tests/unit/angleGrinder/utils/*.js', watched: false },
      //{ pattern: 'tests/tests.entry.js', watched: false },
      // { pattern: 'tests/unit/angleGrinder/forms/*.js', watched: false },
      // { pattern: 'tests/unit/angleGrinder/forms/mixins/*.js', watched: false }
      //{ pattern: 'tests/unit/angleGrinder/**/*.js', watched: false }
      //{ pattern: 'tests/unit/angleGrinder/gridz/mixins/*.js', watched: false }
    ],

    preprocessors: {
      //'src/vendor.js': ['rollup'],
      //'src/bundle.js': ["webpack", 'sourcemap'],
      //'tests/tests.entry.js': ["rollup"],
      //"src/**/*.js": ["rollup"],
      "tests/unit/**/*.js": ["rollup",'sourcemap']
    },
    rollupPreprocessor: {
      external: ['angular','angular-route','angular-resource','angular-sanitize', 'angular-scroll'],
			//This is just a normal Rollup config object, except that `input` is handled for you.
      //plugins: [require('rollup-plugin-babel')()],
      // after -- working:
      plugins: [
        //order is important here to avoid 'ReferenceError: require is not defined'
        resolve(),
        commonjs(),
        babel()
      ],
			output: {
				format: 'iife', // Helps prevent naming collisions.
				name: 'AgModule',//'<your_project>', // Required for 'iife' format.
        sourcemap: 'inline', // Sensible for testing.
        globals: {'angular':'angular'}
			},
		},

    //reporters: ['dots', "coverage"],
    //this is more helful for manual testing
    reporters: ['mocha'],

    // "junit",
    // add 'html', above for reeporter
    // mochaReporter: {
    //   output: 'minimal'
    // },

    browsers: [
      // Run tests using Chrome
      //'jsdom'
      // Run tests using Chrome
      'ChromeHeadless'
    ],

    singleRun: true,

    webpack: webpackConfig,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  })
}
