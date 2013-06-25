lrSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet
mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->

  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach grunt.loadNpmTasks

  # configurable paths
  appConfig =
    app: "./app"
    dist: "./dist"

  grunt.initConfig
    appConfig: appConfig

    clean:
      dist:
        files: [
          dot: true
          src: [
            "<%= appConfig.dist %>"
          ]
        ]

    copy:
      dist:
        files: [
          expand: true
          dot: true
          cwd: "<%= appConfig.app %>"
          dest: "<%= appConfig.dist %>"
          src: [
            "styles/**/*.css"
          ]
        ]

    coffeelint:
      options:
        max_line_length:
          value: 120
          level: "warn"
      app: ["<%= appConfig.app %>/scripts/**/*.coffee"]

    coffee:
      dist:
        files: [
          expand: true
          cwd: "<%= appConfig.app %>/scripts"
          src: "**/*.coffee"
          dest: "<%= appConfig.dist %>/scripts"
          ext: ".js"
        ]

    less:
      dist:
        src: "<%= appConfig.app %>/styles/boot.less"
        dest: "<%= appConfig.dist %>/styles/boot.css"

  grunt.registerTask "build", [
    "clean"
    "copy"
    "coffeelint"
    "coffee"
    "less"
  ]

  grunt.registerTask "default", ["build"]
