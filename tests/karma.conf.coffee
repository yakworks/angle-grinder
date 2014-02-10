# Karma configuration
module.exports = (config) ->
  config.set

    basePath: "../"

    frameworks: [
      "mocha"
      "chai"
    ]

    # list of files / patterns to load in the browser
    files: [
      "components/bower/jquery/jquery.js"
      "components/bower/underscore/underscore.js"
      "components/bower/angular/angular.js"
      "components/bower/angular-mocks/angular-mocks.js"
      "components/bower/angular-resource/angular-resource.js"
      "components/bower/angular-ui-router/release/angular-ui-router.js"
      "components/bower/angular-sanitize/angular-sanitize.js"

      "components/bower/sinon/lib/sinon.js"
      "components/bower/sinon/lib/sinon/behavior.js"
      "components/bower/sinon/lib/sinon/call.js"
      "components/bower/sinon/lib/sinon/spy.js"
      "components/bower/sinon/lib/sinon/stub.js"
      "components/bower/sinon/lib/sinon/mock.js"
      "components/bower/sinon/lib/sinon/assert.js"

      "components/bower/jqgrid/js/grid.base.js"
      "components/bower/select2/select2.js"
      "components/bower/angular-ui-select2/src/select2.js"
      "components/bower/angular-strap/src/common.js"
      "components/bower/angular-strap/src/directives/datepicker.js"
      "components/bower/angular-bootstrap/ui-bootstrap-tpls.js"
      "components/bower/jquery-file-upload/js/jquery.fileupload-angular.js"
      "components/bower/bower-angular-placeholders/angular-placeholders.js"
      "components/bower/angular-bindonce/bindonce.js"

      "src/scripts/angleGrinder/gridz.coffee"

      "src/templates/**/*.html"

      "src/scripts/angleGrinder/modules/*.coffee"
      "src/scripts/angleGrinder/modules/forms/**/*.coffee"
      "src/scripts/angleGrinder/modules/gridz/**/*.coffee"

      "src/scripts/exampleApp/modules/**/*.coffee"
      "src/scripts/exampleApp/application.coffee"
      "src/scripts/exampleApp/routes.coffee"
      "src/scripts/exampleApp/controllers/**/*.coffee"

      "src/scripts/exampleApp/grids.coffee"
      "src/scripts/exampleApp/grids/*.coffee"

      "tests/unit/helpers/**/*.coffee"
      "tests/unit/**/*Spec.coffee"
    ]

    preprocessors:
      "**/*.html": ["html2js"]

      "src/scripts/**/*.coffee": ["coverage"]
      "tests/unit/**/*.coffee": ["coffee"]

    ngHtml2JsPreprocessor:
      stripPrefix: "src/"

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
      ]

    reporters: ["dots", "coverage"]

    # web server port
    port: 8080

    # cli runner port
    runnerPort: 9100

    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: true

    # Start these browsers, currently available:
    # - Chrome
    # - ChromeCanary
    # - Firefox
    # - Opera
    # - Safari (only Mac)
    # - PhantomJS
    # - IE (only Windows)
    browsers: ["PhantomJS"]

    # Continuous Integration mode
    # if true, it capture browsers, run tests and exit
    singleRun: false

    # level of logging
    # possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_WARN

    plugins: [
      "karma-coffee-preprocessor"
      "karma-ng-html2js-preprocessor"

      "karma-mocha"
      "karma-chai-plugins"
      "karma-spec-reporter"
      "karma-coverage"

      "karma-phantomjs-launcher"
      "karma-chrome-launcher"
      "karma-firefox-launcher"
    ]
