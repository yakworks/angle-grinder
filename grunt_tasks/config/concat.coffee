module.exports = (grunt) ->

  dist:
    files:
      "<%= appConfig.dev %>/scripts/scripts.js": [
        "<%= appConfig.dev %>/scripts/**/*.js"
        "!<%= appConfig.dev %>/scripts/templates.js" # do not include complited templates
        "!<%= appConfig.dev %>/scripts/application_test.js" # do not include test application module
        "<%= appConfig.app %>/scripts/**/*.js"
      ]
