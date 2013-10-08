# https://github.com/gruntjs/grunt-contrib-htmlmin
module.exports = (grunt) ->

  dist:
    files: [
      expand: true,
      cwd: "<%= appConfig.app %>",
      src: [
        "**/*.html"
        "!templates/**/*.html"
      ],
      dest: "<%= appConfig.dist %>"
    ]
