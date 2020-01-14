var webpackConfig = require('./karma.webpack.js');

// Reference: http://karma-runner.github.io/0.12/config/configuration-file.html
module.exports = function karmaConfig (config) {
  // default test file
  let testFile = 'tests/tests.all.js'
  // the following allow us to do `yarn test --tests singleTestFile*` or `yarn test --tests /common/*`
  let testRequiresFiles = [] //additional file
  let pargv = process.argv
  //if second to last argument is test then use it, so
  if(pargv[pargv.length-2] === '--tests'){
    //testFilesPattern from command line
    let argTestFile = pargv[pargv.length-1]
    testFile = `tests/**/${argTestFile}.js`
    testRequiresFiles = [{ pattern: 'tests/tests.requires.js', watched: false }]
  }
  //console.log("using testFile", testFile)

  config.set({
    basePath: '../',

    frameworks: [ "mocha", "sinon-chai" ],

    files: [
      //{ pattern: "node_modules/jquery/dist/jquery.js"},
      //{ pattern: 'tests/tests.entry.js', watched: false }
      ...testRequiresFiles,
      { pattern: testFile, watched: false }
      // { pattern: 'tests/unit/angleGrinder/forms/*.js', watched: false },
    ],

    preprocessors: {
      //'src/vendor.js': ['webpack'],
      //'src/bundle.js': ["webpack", 'sourcemap'],
      'tests/tests.requires.js': ["webpack",'sourcemap'],
      [testFile]: ["webpack",'sourcemap'],
      //"src/**/*.js": ["rollup"],
      "tests/unit/**/*.js": ["webpack",'sourcemap']
    },

    //reporters: ['dots', "coverage"],
    //this is more helful for manual testing
    reporters: ['mocha'],
    // "junit", add 'html', above for reeporter
    mochaReporter: {
      output: 'minimal'
    },

    browsers: [
      // Run tests using Chrome
      //'jsdom'
      // Run tests using Chrome
      //'ChromeHeadless'
      'Chrome_no_sandbox'
    ],
    // doing it like this so it works in docker CI and we dont get
    //"Cannot start ChromeHeadless .. Running as root without --no-sandbox is not supported. .." error
    customLaunchers: {
      Chrome_no_sandbox: {
        base: 'ChromeHeadless',
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
    singleRun: true,

    webpack: webpackConfig,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: 'errors-only'
    }
  })
}
