common = angular.module("angleGrinder.common", [])

###
Sample context path configuration:

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

common.filter "withContext", ["pathWithContext", (pathWithContext) ->
  (path) -> pathWithContext(path)
]

# Decorates `$http.pendingRequests` with some useful features
common.factory "pendingRequests", [
  "$http", ($http) ->
    pendingRequests = -> pendingRequests.any()

    # Returns true if any http request is in progress
    pendingRequests.any = ->
      pendingRequests.for "GET", "POST", "PUT", "PATCH", "DELETE"

    # Returns true if a http request with the given method is in progress
    pendingRequests.for = (httpMethods...) ->
      requests = _.filter $http.pendingRequests, (request) ->
        _.contains httpMethods, request.method
      requests.length > 0

    pendingRequests
]

# Returns true is the given string is null, undefined or empty ("")
common.value "isEmpty", (str) ->
  not str or str.length is 0
