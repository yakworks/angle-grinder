# https://github.com/gruntjs/grunt-contrib-watch
module.exports = ->

  coffee:
    files: ["<%= appConfig.app %>/scripts/**/*.coffee", "<%= appConfig.docs %>/exampleApp/**/*.coffee"]
    tasks: ["coffee:dist", "ngtemplates:exampleApp"]

  html:
    files: ["<%= appConfig.app %>/index.html", "<%= appConfig.docs %>/index.html"]
    tasks: ["copy:dev"]

  templates:
    files: ["<%= appConfig.docs %>/exampleApp/templates/**/*.html"]
    tasks: ["ngtemplates:exampleApp"]

  css:
    files: ["<%= appConfig.app %>/styles/**/*.css"]
    tasks: ["copy:dev"]

  less:
    files: ["<%= appConfig.app %>/styles/**/*.less"]
    tasks: ["less"]

  livereload:
    files: ["<%= appConfig.dev %>/**/*", "<%= appConfig.docs %>/**/*"]
    tasks: ["livereload"]
