# https://www.npmjs.com/package/grunt-includes
module.exports = (grunt) ->

  example:
    src: ["index.html"] # Source files
    dest: "<%= appConfig.dev %>" # Destination directory
    flatten: true
    cwd: "<%= appConfig.app %>"
    options:
      debug: true