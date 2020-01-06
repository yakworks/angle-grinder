/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Karma configuration
module.exports = config => config.set({

  basePath: "../",

  frameworks: [
    "mocha",
    "sinon-chai"
  ],

  files: require("./karma-files.js").files,

  preprocessors: {
    "**/*.html": ["html2js"],
    "docs/exampleApp/**/*.coffee": ["coffee"],
    "src/scripts/**/*.js": ["babel"],
    "tests/unit/**/*.js": ["babel"],
    "tests/unit/**/*.coffee": ["coffee"],
    "tests/mocks.coffee": ["coffee"]
  },

  ngHtml2JsPreprocessor: {
    stripPrefix: "docs/"
  },

  junitReporter: {
    outputFile: "test-results.xml",
    suite: ""
  },

  // html - produces a bunch of HTML files with annotated source code
  // lcovonly - produces an lcov.info file
  // lcov - produces html + lcov files. This is the default format
  // cobertura - produces a cobertura-coverage.xml file for easy Hudson integration
  // text-summary - produces a compact text summary of coverage, typically to console
  // text - produces a detailed text table with coverage for all files
  coverageReporter: {
    reporters: [
      { type: "html", dir: "coverage" },
      { type: "text-summary" },
      { type: "cobertura" }
    ]
  },

  reporters: ["dots", "junit", "coverage"],

  // web server port
  port: 8080,

  // cli runner port
  runnerPort: 9100,

  // Start these browsers, currently available:
  // - Chrome
  // - ChromeCanary
  // - Firefox
  // - Opera
  // - Safari (only Mac)
  // - PhantomJS
  // - IE (only Windows)
  customLaunchers: {
    Chrome_no_sandbox: {
      base: 'Chrome',
      flags: [
        '--disable-web-security',
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--remote-debugging-port=9223',
        '--headless',
        '--disable-gpu'
      ]
    }
  },

  // If browser does not capture in given timeout [ms], kill it
  captureTimeout: 30000,

  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,

  // Continuous Integration mode
  // if true, it capture browsers, run tests and exit
  singleRun: false,

  // level of logging
  // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
  logLevel: config.LOG_WARN
});
