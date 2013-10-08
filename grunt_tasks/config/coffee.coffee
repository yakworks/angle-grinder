# https://github.com/gruntjs/grunt-contrib-coffee
module.exports = (grunt) ->

  dist:
    files: [
      expand: true
      cwd: "<%= appConfig.app %>/scripts"
      src: "**/*.coffee"
      dest: "<%= appConfig.dev %>/scripts"
      ext: ".js"
    ]

  test:
    files: [
      expand: true
      cwd: "<%= appConfig.test %>"
      src: "**/*.coffee"
      dest: "<%= appConfig.dev %>/tests"
      ext: ".js"
    ]
