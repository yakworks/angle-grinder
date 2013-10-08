# Karma configuration
module.exports = (config) ->
  config.set

    basePath: "../"

    frameworks: [
      "jasmine"
    ]

    # list of files / patterns to load in the browser
    files: [
      "bower/jquery/jquery.js"
      "bower/underscore/underscore.js"
      "bower/angular/angular.js"
      "bower/angular-mocks/angular-mocks.js"
      "bower/angular-resource/angular-resource.js"
      "bower/angular-route/angular-route.js"
      "bower/jasmine-jquery/lib/jasmine-jquery.js"

      "bower/sinon/lib/sinon.js"
      "bower/sinon/lib/sinon/spy.js"
      "bower/sinon/lib/sinon/call.js"
      "bower/sinon/lib/sinon/stub.js"
      "bower/sinon/lib/sinon/mock.js"
      "bower/sinon/lib/sinon/assert.js"

      "bower/jqgrid/js/grid.base.js"
      "bower/select2/select2.js"
      "bower/angular-ui-select2/src/select2.js"
      "bower/angular-strap/src/common.js"
      "bower/angular-strap/src/directives/datepicker.js"
      "bower/angular-bootstrap/ui-bootstrap-tpls.js"

      "src/scripts/jqgrid/gridz.coffee"

      "src/templates/**/*.html"

      "src/scripts/modules/*.coffee"
      "src/scripts/modules/forms/*.coffee"
      "src/scripts/modules/gridz/*.coffee"

      "src/scripts/application.coffee"
      "src/scripts/routes.coffee"
      "src/scripts/controllers/**/*.coffee"

      "tests/unit/helpers/**/*.coffee"
      "tests/unit/**/*Spec.coffee"
    ]

    preprocessors:
      "**/*.coffee": ["coffee"]
      "**/*.html": ["html2js"]

    ngHtml2JsPreprocessor:
      stripPrefix: "src/"

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

      "karma-jasmine"
      "karma-spec-reporter"
      "karma-coverage"

      "karma-phantomjs-launcher"
      "karma-chrome-launcher"
      "karma-firefox-launcher"
    ]
