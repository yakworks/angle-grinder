module.exports = (grunt) ->

  options:
    base: "<%= appConfig.app %>"
    module: "angleGrinder"

  myApp:
    src: ["<%= appConfig.app %>/templates/**/*.html"]
    dest: "<%= appConfig.dev %>/scripts/templates.js"
