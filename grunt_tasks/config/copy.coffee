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
      cwd: "third-party/jquery-ui-bootstrap"
      dest: "<%= appConfig.dist %>/styles/images"
      src: [
        "**/images/**/*.{png,jpg,jpeg}"
      ]
    ,
      # another workaround for missing images
      # this time for slect2 component
      expand: true
      flatten: true
      cwd: "bower/select2"
      dest: "<%= appConfig.dist %>/styles"
      src: [
        "**/*.{png,jpg,jpeg,gif}"
      ]
    ]

