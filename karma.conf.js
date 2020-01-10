// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  config.set({
    basePath: '',

    frameworks: [ "mocha", "sinon-chai" ],

    files: [
      { pattern: "node_modules/jquery/dist/jquery.js", watched: false },
      { pattern: "node_modules/lodash/lodash.js"},
      //TESTS, for now we can list them while converting but will be blanket 'tests/unit/**/*.js' when done
      //only works one 'package' at a time like this
      // each file acts as entry point for the webpack configuration and it will load angular twice
      //{ pattern: 'tests/unit/angleGrinder/select2/**/*.js', watched: false,   included: false },
      //{ pattern: 'tests/unit/angleGrinder/common/commonSpec.js', watched: false },
      'tests/tests.entry.js'

    ],

    preprocessors: {
      'tests/tests.entry.js': ["webpack"],
      "src/**/*.js": ["webpack", 'sourcemap'],
      "tests/unit/**/*.js": ["webpack", 'sourcemap']
    },

    reporters: ['dots', "coverage"],

    // "junit",
    // add 'html', above for reeporter
    mochaReporter: {
      output: 'minimal'
    },

    browsers: [
      // Run tests using Chrome
      //'jsdom'
      // Run tests using Chrome
      'ChromeHeadless'
    ],

    singleRun: true,

    webpack: require('./config/webpack.test.js'),

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  })
}
