# https://github.com/gruntjs/grunt-contrib-uglify
module.exports = (grunt) ->

  options:
    compress: false
    beautify:
      beautify: true
      ascii_only: true
      quote_keys: true
    mangle: false
