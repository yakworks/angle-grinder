module.exports = (grunt) ->

  dist:
    files:
      "<%= appConfig.dev %>/styles/boot.css": "<%= appConfig.app %>/styles/boot.less"
      "<%= appConfig.dev %>/styles/gridz.css": "<%= appConfig.app %>/styles/gridz.less"
