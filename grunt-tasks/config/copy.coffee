# https://github.com/gruntjs/grunt-contrib-copy
module.exports = (grunt) ->

  dev:
    files: [
      expand: true
      dot: true
      cwd: "<%= appConfig.app %>"
      dest: "<%= appConfig.dev %>"
      src: [
        "*.{ico,txt}"
        "**/*.html"
        "components/**/*"
        "img/**/*.{gif,webp}"
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
        "img/**/*"
      ]
    ,
      # workaround for jquery-ui-bootstrap component
      # include its images in the production release
      expand: true
      flatten: true
      cwd: "components/third-party/jquery-ui-bootstrap"
      dest: "<%= appConfig.dist %>/img"
      src: [
        "**/images/**/*.{png,jpg,jpeg}"
      ]
    ,
      # another workaround for missing images
      # this time for slect2 component
      expand: true
      flatten: true
      cwd: "components/bower/select2"
      dest: "<%= appConfig.dist %>/img"
      src: [
        "**/*.{png,jpg,jpeg,gif}"
      ]
    ]
