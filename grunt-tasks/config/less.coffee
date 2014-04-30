# https://github.com/gruntjs/grunt-contrib-less
module.exports = (grunt) ->

  dist:
    # TODO dry up this config
    files:
      "<%= appConfig.dev %>/styles/boot.css": "<%= appConfig.app %>/styles/boot.less"
      "<%= appConfig.dev %>/styles/gridz.css": "<%= appConfig.app %>/styles/gridz.less"
      "<%= appConfig.dev %>/styles/animations.css": "<%= appConfig.app %>/styles/animations.less"
