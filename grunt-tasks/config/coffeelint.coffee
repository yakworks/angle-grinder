# https://github.com/vojtajina/grunt-coffeelint
module.exports = (grunt) ->

  options:
    max_line_length:
      value: 120
      level: "warn"

  app: ["Gruntfile.coffee", "<%= appConfig.app %>/scripts/**/*.coffee", "<%= appConfig.app %>/scripts/**/**/*.coffee"]
  test:
    files:
      src:["<%= appConfig.test %>/**/*.coffee"]
