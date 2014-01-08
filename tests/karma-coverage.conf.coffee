# Karma configuration
module.exports = (config) ->
  config.set

    frameworks: [
      "mocha"
      "chai"
    ]

    # list of files / patterns to load in the browser
    files: [
      "components/jquery/js/jquery.js"
      "components/underscore/js/underscore.js"
      "components/angular/js/angular.js"
      "components/angular-mocks/js/angular-mocks.js"
      "components/angular-resource/js/angular-resource.js"
      "components/angular-route/js/angular-route.js"
      "components/angular-sanitize/js/angular-sanitize.js"

      "components/sinon/sinon.js"
      "components/sinon/spy.js"
      "components/sinon/call.js"
      "components/sinon/stub.js"
      "components/sinon/mock.js"
      "components/sinon/assert.js"

      "components/jqgrid/js/grid.base.js"
      "components/select2/js/select2.js"
      "components/angular-ui-select2/js/select2.js"
      "components/angular-strap/common.js"
      "components/angular-strap/directives/datepicker.js"
      "components/angular-bootstrap/js/ui-bootstrap-tpls.js"
      "components/jquery-file-upload/js/jquery.fileupload-angular.js"

      "templates/**/*.html"

      "scripts/jqgrid/gridz.js"

      "scripts/modules/*.js"
      "scripts/modules/forms/**/*.js"
      "scripts/modules/gridz/**/*.js"
      "scripts/modules/examples*.js"

      "scripts/application.js"
      "scripts/routes.js"
      "scripts/controllers/**/*.js"

      "tests/unit/helpers/**/*.js"
      "tests/unit/**/*Spec.js"
    ]

    preprocessors:
      "templates/**/*.html": ["html2js"]
      "scripts/**/*.js": "coverage"

    ngHtml2JsPreprocessor:
      stripPrefix: "../app/"

    # list of files to exclude
    exclude: []

    # web server port
    port: 8080

    # cli runner port
    runnerPort: 9100

    # enable / disable watching file and executing tests whenever any file changes
    autoWatch: false

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
      "karma-ng-html2js-preprocessor"

      "karma-mocha"
      "karma-chai-plugins"
      "karma-spec-reporter"
      "karma-coverage"

      "karma-phantomjs-launcher"
      "karma-chrome-launcher"
      "karma-firefox-launcher"
    ]
