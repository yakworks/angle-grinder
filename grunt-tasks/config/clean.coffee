# https://github.com/gruntjs/grunt-contrib-clean
module.exports = (grunt) ->

  dev: [
    "<%= appConfig.dev %>/**/*"
    "!<%= appConfig.dev %>/.git*"
  ]

  dist: [
    "<%= appConfig.dist %>/**/*"
    "!<%= appConfig.dist %>/.git*"
  ]


