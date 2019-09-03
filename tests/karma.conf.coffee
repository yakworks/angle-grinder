# Karma configuration
module.exports = (config) ->
  config.set

    basePath: "../"

    frameworks: [
      "mocha"
      "sinon-chai"
    ]

    files: require("./karma-files").files

    preprocessors:
      "**/*.html": ["html2js"]

      "src/scripts/**/*.coffee": ["coffee"]
      "docs/exampleApp/**/*.coffee": ["coffee"]
      "tests/unit/**/*.coffee": ["coffee"]
      "tests/mocks.coffee": ["coffee"]

    ngHtml2JsPreprocessor:
      stripPrefix: "docs/"

    junitReporter:
      outputFile: "test-results.xml"
      suite: ""

    # html - produces a bunch of HTML files with annotated source code
    # lcovonly - produces an lcov.info file
    # lcov - produces html + lcov files. This is the default format
    # cobertura - produces a cobertura-coverage.xml file for easy Hudson integration
    # text-summary - produces a compact text summary of coverage, typically to console
    # text - produces a detailed text table with coverage for all files
    coverageReporter:
      reporters: [
        { type: "html", dir: "coverage" }
        { type: "text-summary" }
        { type: "cobertura" }
      ]

    reporters: ["dots", "junit", "coverage"]

    # web server port
    port: 8080

    # cli runner port
    runnerPort: 9100

    # Start these browsers, currently available:
    # - Chrome
    # - ChromeCanary
    # - Firefox
    # - Opera
    # - Safari (only Mac)
    # - PhantomJS
    # - IE (only Windows)
    customLaunchers:
      Chrome_no_sandbox:
        base: 'Chrome'
        flags: [ '--headless', '--no-sandbox', '--disable-translate',
          '--disable-extensions',
          '--disable-background-networking',
          '--safebrowsing-disable-auto-update',
          '--disable-sync',
          '--metrics-recording-only',
          '--disable-default-apps',
          '--mute-audio',
          '--no-first-run ',
          '--disable-gpu',
          '--headless '
          '--hide-scrollbars',
          '--enable-logging',
          '--v=1',
          '--disable-setuid-sandbox ']

    # If browser does not capture in given timeout [ms], kill it
    captureTimeout: 30000

    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: true

    # Continuous Integration mode
    # if true, it capture browsers, run tests and exit
    singleRun: false

    # level of logging
    # possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_WARN
