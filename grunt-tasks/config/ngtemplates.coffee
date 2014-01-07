# https://github.com/ericclemmons/grunt-angular-templates
module.exports = (grunt) ->

  options:
    base: "<%= appConfig.app %>"
    module: "angleGrinder"

  myApp:
    cwd: "<%= appConfig.app %>"
    src: "templates/**/*.html"
    dest: "<%= appConfig.dev %>/scripts/templates.js"
