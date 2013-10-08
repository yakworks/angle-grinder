# https://github.com/ronaldlokers/grunt-casperjs
module.exports = (grunt) ->

  files: ["<%= appConfig.dev %>/tests/casperjs/**/*Scenario.js"]
