module.exports = (grunt) ->

  # load all grunt tasks
  require("load-grunt-tasks")(grunt)
  grunt.loadTasks("grunt-tasks")

  config = (name) ->
    require("./grunt-tasks/config/#{name}")(grunt, appConfig)

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
    watch:          config "watch"

    # Compile CoffeeScript files to JavaScript
    coffee:         config "coffee"
    # Lint your CoffeeScript using grunt.js and coffeelint
    coffeelint:     config "coffeelint"

    # Compile LESS files to CSS
    less:           config "less"
    # Concatenate files
    concat:         config "concat"

    # Minify HTML
    htmlmin:        config "htmlmin"
    # Tgruask to concatenate & pre-load your AngularJS templates
    ngtemplates:    config "ngtemplates"
    # Minify files with UglifyJS
    uglify:         config "uglify"
    # Clear files and folders
    clean:          config "clean"
    # Copy files and folders
    copy:           config "copy"
    # General purpose text replacement for grunt
    replace:        config "replace"
    # Grunt plugin for Bower
    bower:          config "bower"
    # Publish to GitHub pages
    "gh-pages":     config "gh-pages"

    # Replaces references to non-optimized scripts or stylesheets into a set of HTML files
    useminPrepare:  config "usemin_prepare"
    usemin:         config "usemin"

    # Plugin for Karma
    karma:          config "karma"

    # Start a static web server
    connect:        config "connect"

    # Update your devDependencies and dependencies automatically with a grunt task
    devUpdate:      config "devUpdate"

  grunt.renameTask "regarde", "watch"

  grunt.registerTask "build:dev", [
    "clean"
    "bower"
    "coffeelint"
    "coffee"
    "less"
    "copy:dev"
    "ngtemplates:exampleApp"
    "replace"
  ]

  grunt.registerTask "server", [
    "build:dev"

    "configureProxies"
    "livereload-start"
    "connect:livereload"
    "watch"
  ]

  # run unit tests
  grunt.registerTask "test:unit", [
    "karma:unit"
  ]

  # run unit tests in the watch mode
  grunt.registerTask "test:unit:watch", [
    "karma:watch"
  ]

  # run unit tests in the watch mode
  grunt.registerTask "test:watch", [
    "test:unit:watch"
  ]

  grunt.registerTask "test", [
    "karma:unit"
  ]

  grunt.registerTask "build:dist", [
    "test"
    "build:dev"
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
    "karma:watch"
  ]

  grunt.registerTask "default", ["test"]
