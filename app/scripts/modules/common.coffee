common = angular.module("angleGrinder.common", [])

###
  Sample context path configuration
  ```
  app.config [
  "pathWithContextProvider", (pathWithContextProvider) ->
    contextPath = $("body").data("context-path")
    pathWithContextProvider.setContextPath(contextPath) if contextPath?
  ]
  ```
###
class PathWithContextProvider
  constructor: ->
    @contextPath = ""

  # Returns sanitized context path
  getContextPath: ->
    @contextPath.replace /\/*$/, ""

  setContextPath: (path) ->
    @contextPath = path
    return # it cannot return a value

  sanitizePath: (path) ->
    path.replace /^\/*/, ""

  $get: ->
    (path) =>
      return path if @getContextPath() is ""
      [@getContextPath(), @sanitizePath(path)].join("/")

common.provider "pathWithContext", PathWithContextProvider
