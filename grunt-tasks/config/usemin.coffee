# https://github.com/yeoman/grunt-usemin
module.exports = (grunt) ->

  html: [
    "<%= appConfig.dist %>/**/*.html"
    "!<%= appConfig.dist %>/templates/**/*.html"
  ]
  css: ["<%= appConfig.dist %>/styles/**/*.css"]
  options:
    dirs: ["<%= appConfig.dist %>"]
