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
  parseBrowsers = ({ defaultBrowser } = { default: "PhantomJS" }) ->
    browsers = grunt.option("browsers") or defaultBrowser
    browsers.replace(/[\s\[\]]/, "").split(",")

  options:
    configFile: "<%= appConfig.test %>/karma.conf.coffee"
    browsers: parseBrowsers(defaultBrowser: "PhantomJS")
    colors: true

  # single run karma
  unit:
    singleRun: true

  # run karma for unit tests in watch mode
  watch:
    singleRun: false
    autoWatch: true
