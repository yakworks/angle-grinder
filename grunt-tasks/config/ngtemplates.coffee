# https://github.com/ericclemmons/grunt-angular-templates
module.exports = (grunt) ->

  options:
    base: "<%= appConfig.docs %>"
    module: "exampleApp"

  exampleApp:
    cwd: "<%= appConfig.docs %>"
    src: "templates/**/*.html"
    dest: "<%= appConfig.dev %>/scripts/exampleApp/templates.js"
