# https://github.com/gruntjs/grunt-contrib-watch
module.exports = (grunt) ->

  coffee:
    files: ["<%= appConfig.app %>/scripts/**/*.coffee"]
    tasks: ["coffee:dist", "ngtemplates"]

  html:
    files: [
      "<%= appConfig.app %>/index.html"
    ]
    tasks: ["copy:dev"]

  templates:
    files: ["<%= appConfig.app %>/templates/**/*.html"]
    tasks: ["ngtemplates:myApp"]

  css:
    files: ["<%= appConfig.app %>/styles/**/*.less"]
    tasks: ["less"]

  livereload:
    files: ["<%= appConfig.dev %>/**/*"]
    tasks: ["livereload"]
