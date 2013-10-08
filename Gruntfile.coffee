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

    # Run tasks whenever watched files change
    watch:          loadMoule "watch"

    # Compile CoffeeScript files to JavaScript
    coffee:         loadMoule "coffee"
    # Lint your CoffeeScript using grunt.js and coffeelint
    coffeelint:     loadMoule "coffeelint"

    # Compile LESS files to CSS
    less:           loadMoule "less"
    # Concatenate files
    concat:         loadMoule "concat"

    # Minify HTML
    htmlmin:        loadMoule "htmlmin"
    # Tgruask to concatenate & pre-load your AngularJS templates
    ngtemplates:    loadMoule "ngtemplates"
    # Minify files with UglifyJS
    uglify:         loadMoule "uglify"
    # Clear files and folders
    clean:          loadMoule "clean"
    # Copy files and folders
    copy:           loadMoule "copy"
    # Grunt plugin for Bower
    bower:          loadMoule "bower"

    # Replaces references to non-optimized scripts or stylesheets into a set of HTML files
    useminPrepare:  loadMoule "usemin_prepare"
    usemin:         loadMoule "usemin"

    # Plugin for Karma
    karma:          loadMoule "karma"
    # Plugin for CasperJS
    casperjs:       loadMoule "casperjs"
    # Custom plugin for generating jasmine html tests runner
    jasminehtml:    loadMoule "jasminehtml"

    # Start a static web server
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
