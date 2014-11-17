# https://github.com/ericclemmons/grunt-angular-templates
module.exports = (grunt) ->

  options:
    base: "<%= appConfig.app %>"
    prefix: "/"
    module: "exampleApp"

  exampleApp:
    cwd: "<%= appConfig.app %>"
    src: "templates/**/*.html"
    dest: "<%= appConfig.dev %>/scripts/exampleApp/templates.js"
