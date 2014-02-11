# https://github.com/karma-runner/grunt-karma
module.exports = (grunt) ->

  _extractOptions = (key, opts = {}) ->
    options = grunt.option(key) or opts.default
    options = options.replace(/[\s\[\]]/, "")
    options.split(",")

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
    opts.default or= "PhantomJS"
    _extractOptions("browsers", opts)

  options:
    browsers: parseBrowsers(default: "PhantomJS")
    colors: true

  unit:
    configFile: "<%= appConfig.test %>/karma.conf.coffee"
    singleRun: true

  # run karma for unit tests in watch mode
  watch:
    configFile: "<%= appConfig.test %>/karma.conf.coffee"
    singleRun: false
    autoWatch: true
