livereloadSnippet = require("grunt-contrib-livereload/lib/utils").livereloadSnippet
proxySnippet = require("grunt-connect-proxy/lib/utils").proxyRequest

mountFolder = (connect, dir) ->
  connect.static require("path").resolve(dir)

# https://github.com/gruntjs/grunt-contrib-connect
module.exports = (grunt, appConfig) ->

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
