# https://github.com/karma-runner/grunt-karma
module.exports = (grunt) ->

  # Extract browsers list from the command line
  # For example `grunt test --browsers=Chrome,Firefox`
  # Currently available browsers:
  # - Chrome
  # - ChromeCanary
  # - Firefox
  # - Opera
  # - Safari (only Mac)
  # - PhantomJS
  # - IE (only Windows)
  parseBrowsers = (opts = {}) ->
    opts.defaultBrowser or= "PhantomJS"

    browsers = grunt.option("browsers") || opts.defaultBrowser
    browsers = browsers.replace(/[\s\[\]]/, "")
    browsers.split(",")

  options:
    basePath: "../<%= appConfig.dev %>"
    browsers: parseBrowsers(defaultBrowser: "PhantomJS")
    colors: true
    # test results reporter to use
    # possible values: dots || progress || growl
    reporters: ["dots"]
    # If browser does not capture in given timeout [ms], kill it
    captureTimeout: 5000

  unit:
    configFile: "<%= appConfig.test %>/karma.conf.coffee"
    reporters: ["dots", "coverage"]
    coverageReporter:
      type: "html"
      dir: "coverage"

    singleRun: true

  coffee:
    basePath: "../"
    configFile: "<%= appConfig.test %>/karma-coffee.conf.coffee"
    reporters: ["dots"]
    singleRun: true

  watch:
    configFile: "<%= appConfig.test %>/karma.conf.coffee"
    reporters: ["dots"]
    singleRun: false
    autoWatch: true
