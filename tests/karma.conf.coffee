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
      "components/bower/angular-route/angular-route.js"

      "components/bower/sinon/lib/sinon.js"
      "components/bower/sinon/lib/sinon/spy.js"
      "components/bower/sinon/lib/sinon/call.js"
      "components/bower/sinon/lib/sinon/stub.js"
      "components/bower/sinon/lib/sinon/mock.js"
      "components/bower/sinon/lib/sinon/assert.js"

      "components/bower/jqgrid/js/grid.base.js"
      "components/bower/select2/select2.js"
      "components/bower/angular-ui-select2/src/select2.js"
      "components/bower/angular-strap/src/common.js"
      "components/bower/angular-strap/src/directives/datepicker.js"
      "components/bower/angular-bootstrap/ui-bootstrap-tpls.js"

      "src/scripts/jqgrid/gridz.coffee"

      "src/templates/**/*.html"

      "src/scripts/modules/*.coffee"
      "src/scripts/modules/forms/**/*.coffee"
      "src/scripts/modules/gridz/**/*.coffee"

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

      "karma-mocha"
      "karma-chai-plugins"
      "karma-spec-reporter"
      "karma-coverage"

      "karma-phantomjs-launcher"
    ]
