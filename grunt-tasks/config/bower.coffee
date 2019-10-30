# https://github.com/yatskevich/grunt-bower-task
module.exports = (grunt) ->

  install:
    options:
      targetDir: "<%= appConfig.dev %>"
      layout: "byComponent"
      cleanTargetDir: true
      install: false
