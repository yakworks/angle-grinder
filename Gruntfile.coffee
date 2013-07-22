livereloadSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet
proxySnippet = require("grunt-connect-proxy/lib/utils").proxyRequest

mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

module.exports = (grunt) ->
  # load all grunt tasks
  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks)
  grunt.loadTasks("tasks")

  # Extract browsers list from the command line
  # For example `grunt test --browsers=Chrome,Firefox`
  # Currently available browsers:
  # - Chrome
  # - ChromeCanary
  # - Firefox
  # - Opera
  # - Safari (only Mac)
  # - PhantomJS
  # - IE (only Windows)
  parseBrowsers = (opts = {}) ->
    opts.defaultBrowser or= "PhantomJS"

    browsers = grunt.option("browsers") || opts.defaultBrowser
    browsers = browsers.replace(/[\s\[\]]/, "")
    browsers.split(",")

  # configurable paths
  appConfig =
    app: "app"
    test: "test"
    dist: "dist"
    dev: "dev"

  grunt.initConfig
    appConfig: appConfig
    pkg: grunt.file.readJSON("package.json")

    watch:
      coffee:
        files: ["<%= appConfig.app %>/scripts/**/*.coffee"]
        tasks: ["coffee:dist", "ngtemplates"]

      coffeeTest:
        files: ["<%= appConfig.test %>/**/*.coffee"]
        tasks: [
          "coffee:test"
          "jasminehtml"
          ]

      html:
        files: [
          "<%= appConfig.app %>/**/*.html"
          "!<%= appConfig.app %>/templates/**/*.html"
        ]
        tasks: ["copy:dev"]

      templates:
        files: ["<%= appConfig.app %>/templates/**/*.html"]
        tasks: ["ngtemplates"]

      css:
        files: ["<%= appConfig.app %>/styles/**/*.less"]
        tasks: ["less"]

      livereload:
        files: ["<%= appConfig.dev %>/**/*"]
        tasks: ["livereload"]

    coffee:
      dist:
        files: [
          expand: true
          cwd: "<%= appConfig.app %>/scripts"
          src: "**/*.coffee"
          dest: "<%= appConfig.dev %>/scripts"
          ext: ".js"
        ]

      test:
        files: [
          expand: true
          cwd: "<%= appConfig.test %>"
          src: "**/*.coffee"
          dest: "<%= appConfig.dev %>/test"
          ext: ".js"
        ]

    less:
      dist:
        files:
          "<%= appConfig.dev %>/styles/boot.css": "<%= appConfig.app %>/styles/boot.less"
          "<%= appConfig.dev %>/styles/gridz.css": "<%= appConfig.app %>/styles/gridz.less"

    concat:
      dist:
        files:
          "<%= appConfig.dev %>/scripts/scripts.js": [
            "<%= appConfig.dev %>/scripts/**/*.js"
            "!<%= appConfig.dev %>/scripts/templates.js" # do not include complited templates
            "!<%= appConfig.dev %>/scripts/application_test.js" # do not include test application module
            "<%= appConfig.app %>/scripts/**/*.js"
          ]

    useminPrepare:
      html: [
        "<%= appConfig.dev %>/**/*.html"
        "!<%= appConfig.dev %>/templates/**/*.html"
      ]
      options:
        dest: "<%= appConfig.dist %>"

    usemin:
      html: [
        "<%= appConfig.dist %>/**/*.html"
        "!<%= appConfig.dist %>/templates/**/*.html"
      ]
      css: ["<%= appConfig.dist %>/styles/**/*.css"]
      options:
        dirs: ["<%= appConfig.dist %>"]

    htmlmin:
      dist:
        files: [
          expand: true,
          cwd: "<%= appConfig.app %>",
          src: [
            "**/*.html"
            "!templates/**/*.html"
          ],
          dest: "<%= appConfig.dist %>"
        ]

    uglify:
      options:
        compress: false
        beautify: true
        mangle: false

    copy:
      dev:
        files: [
          expand: true
          dot: true
          cwd: "<%= appConfig.app %>"
          dest: "<%= appConfig.dev %>"
          src: [
            "*.{ico,txt}"
            "**/*.html"
            "!templates/**/*.html"
            "components/**/*"
            "images/**/*.{gif,webp}"
            "font/*"
            "styles/**/*.css"
          ]
        ]

      dist:
        files: [
          expand: true
          cwd: "<%= appConfig.app %>"
          dest: "<%= appConfig.dist %>"
          src: [
            "font/**/*"
            "images/**/*"
          ]
        ,
          # workaround for jquery-ui-bootstrap component
          # include it's images in the production release
          expand: true
          flatten: true
          cwd: "custom_components/jquery-ui-bootstrap"
          dest: "<%= appConfig.dist %>/styles/images"
          src: [
            "**/images/**/*.{png,jpg,jpeg}"
          ]
        ]

    coffeelint:
      options:
        max_line_length:
          value: 120
          level: "warn"

      app: ["Gruntfile.coffee", "<%= appConfig.app %>/scripts/**/*.coffee"]
      test: ["<%= appConfig.test %>/**/*.coffee"]

    ngtemplates:
      options:
        base: "<%= appConfig.app %>"
        module: "angleGrinder"

      myApp:
        src: [
          "<%= appConfig.app %>/templates/**/*.html"
          "<%= appConfig.app %>/views/**/*.html"
        ]
        dest: "<%= appConfig.dev %>/scripts/templates.js"

    bower:
      install:
        options:
          targetDir: "<%= appConfig.dev %>/components"
          layout: "byComponent"
          cleanTargetDir: true
          install: false

    karma:
      options:
        basePath: "../<%= appConfig.dev %>"
        browsers: parseBrowsers(defaultBrowser: "PhantomJS")
        colors: true
        # test results reporter to use
        # possible values: dots || progress || growl
        reporters: ["dots"]
        # If browser does not capture in given timeout [ms], kill it
        captureTimeout: 5000

      unit:
        configFile: "<%= appConfig.test %>/karma.conf.coffee"
        reporters: ["dots", "coverage"]
        preprocessors:
          "scripts/**/*.js": "coverage"
        coverageReporter:
          type: "html"
          dir: "coverage"

        singleRun: true

      coffee:
        basePath: "../"
        configFile: "<%= appConfig.test %>/karma-coffee.conf.coffee"
        reporters: ["dots"]
        singleRun: true

      e2e:
        configFile: "<%= appConfig.test %>/karma-e2e.conf.coffee"
        singleRun: true # `false` for debugging

      watch:
        configFile: "<%= appConfig.test %>/karma.conf.coffee"
        reporters: ["dots"]
        singleRun: false
        autoWatch: true

    jasminehtml:
      options:
        dest: "<%= appConfig.dev %>"

    casperjs:
      files: ["<%= appConfig.dev %>/test/casperjs/**/*_scenario.js"]

    clean:
      dev: [
        "<%= appConfig.dev %>/**/*"
        "!<%= appConfig.dev %>/.git*"
      ]
      dist: [
        "<%= appConfig.dist %>/**/*"
        "!<%= appConfig.dist %>/.git*"
      ]

    connect:
      options:
        hostname: "localhost"

      proxies: [
        context: "/api"
        host: "localhost"
        port: 8000
        https: false
        changeOrigin: false
      ]

      e2e:
        options:
          port: 9001
          middleware: (connect) ->
            [
              mountFolder(connect, appConfig.dev)
              proxySnippet
            ]

      livereload:
        options:
          port: 9000
          middleware: (connect) ->
            [
              livereloadSnippet
              mountFolder(connect, appConfig.dev)
              proxySnippet
            ]

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

  grunt.registerTask "test:e2e", [
    "build:dev"
    "configureProxies"
    "connect:e2e"
    "karma:e2e"
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

    # run unit tests
    "karma:unit"

    # run e2e tests
    "connect:e2e"
    "karma:e2e"

    # run casperjs integration tests
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
