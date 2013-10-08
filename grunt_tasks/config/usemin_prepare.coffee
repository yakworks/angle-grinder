module.exports = (grunt) ->

  html: [
    "<%= appConfig.dev %>/**/*.html"
    "!<%= appConfig.dev %>/templates/**/*.html"
  ]
  options:
    dest: "<%= appConfig.dist %>"
