# https://github.com/gruntjs/grunt-contrib-copy
module.exports = (grunt) ->

  dev:
    files: [
      expand: true
      dot: true
      cwd: "<%= appConfig.docs %>"
      dest: "<%= appConfig.dev %>"
      src: [
        "*.{ico,txt}"
        "img/**/*.{gif,png,jpg}"
        "font/*"
        "styles/**/*.css"
      ]
    ,
      expand: true
      dot: true
      cwd: "<%= appConfig.app %>"
      dest: "<%= appConfig.dev %>"
      src: [
        "*.{ico,txt}"
        "img/**/*.{gif,png,jpg}"
        "styles/**/*.css"
      ]
    ,
      #copy bootstrap and font awsome fonts
      expand: true
      flatten: true
      cwd: "components/bower"
      dest: "<%= appConfig.dev %>/fonts"
      src: [
        "*/fonts/*.{otf,eot,svg,ttf,woff,woff2}"
      ]
    ,
      # workaround for jquery-ui-bootstrap component
      # include its images in the production release
      expand: true
      flatten: true
      cwd: "components/third-party/jquery-ui-bootstrap"
      dest: "<%= appConfig.dev %>/img"
      src: [
        "**/img/**/*.{png,jpg,jpeg}"
      ]
    ,
      # another workaround for missing images
      # this time for select2 component
      expand: true
      flatten: true
      cwd: "components/bower/select2"
      dest: "<%= appConfig.dev %>/img"
      src: [
        "**/*.{png,jpg,jpeg,gif}"
      ]
    ]

  dist:
    files: [
      expand: true
      cwd: "<%= appConfig.dev %>"
      dest: "<%= appConfig.dist %>"
      src: [
        "fonts/**/*"
        "img/**/*"
      ]
    ]
