module.exports = (grunt) ->

  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.loadTasks("grunt_tasks")

  loadMoule = (name) ->
    require("./grunt_tasks/config/#{name}")(grunt, appConfig)

  # configurable paths
  appConfig =
    app: "src"
    test: "tests"
    dist: "dist"
    dev: "build"

  grunt.initConfig
    appConfig: appConfig
    pkg: grunt.file.readJSON("package.json")

    watch:          loadMoule "watch"
    coffee:         loadMoule "coffee"
    less:           loadMoule "less"
    concat:         loadMoule "concat"
    useminPrepare:  loadMoule "usemin_prepare"
    usemin:         loadMoule "usemin"
    htmlmin:        loadMoule "htmlmin"
    uglify:         loadMoule "uglify"
    copy:           loadMoule "copy"
    coffeelint:     loadMoule "coffeelint"
    ngtemplates:    loadMoule "ngtemplates"
    bower:          loadMoule "bower"
    karma:          loadMoule "karma"
    jasminehtml:    loadMoule "jasminehtml"
    casperjs:       loadMoule "casperjs"
    clean:          loadMoule "clean"
    connect:        loadMoule "connect"

  grunt.renameTask "regarde", "watch"

  grunt.registerTask "build:dev", [
    "clean"
    "bower"
    "coffeelint"
    "coffee"
    "less"
    "copy:dev"
    "ngtemplates"
    "jasminehtml"
  ]

  grunt.registerTask "server", [
    "build:dev"

    "configureProxies"
    "livereload-start"
    "connect:livereload"
    "watch"
  ]

  grunt.registerTask "test", [
    "build:dev"
    "ngtemplates"
    "karma:unit"
  ]

  grunt.registerTask "test:casperjs", [
    "build:dev"
    "configureProxies"
    "connect:e2e"
    "casperjs"
  ]

  # run all tests on the ci server
  grunt.registerTask "test:ci", [
    "build:dev"
    "ngtemplates"

    # run unit + integration tests
    "karma:unit"

    "connect:e2e"
    "casperjs"
  ]

  grunt.registerTask "build:dist", [
    "test:ci"
    "copy:dist"
    "useminPrepare"
    "htmlmin"
    "concat"
    "usemin"
    "uglify"
    "cssmin"
  ]

  grunt.renameTask "build:dist", "build"

  grunt.registerTask "test:watch", [
    "coffee:test"
    "karma:watch"
  ]

  grunt.registerTask "default", ["test"]
