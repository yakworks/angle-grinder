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
