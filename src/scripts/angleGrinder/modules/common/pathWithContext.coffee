app = angular.module "angleGrinder.common"

# Build an url with the query string from the given params
app.value "urlBuilder", (path, params = {}) ->
  queryString = _.chain(params).map((value, key) -> "#{key}=#{value}").join("&").value()
  _.filter([path, queryString], (part) -> part.length > 0).join("?")

###
Sample context path configuration:

```
app.config [
"pathWithContextProvider", (pathWithContextProvider) ->
  contextPath = $("body").data("context-path")
  pathWithContextProvider.setContextPath(contextPath)
]
```
###
app.provider "pathWithContext", ->
  contextPath = "/"

  # strips '/' from the end and the beginning
  sanitizePath = (path) ->
    return "/" if path.length is 0
    "/" + path.replace(/\/*$/, "").replace(/^\/*/, "")

  # Returns sanitized context path
  setContextPath: (path) ->
    contextPath = sanitizePath(path)
    return # it cannot return a value

  $get: [
    "urlBuilder", (urlBuilder) ->

      (path, params = {}) ->
        # build a path with the context
        path = _.filter([contextPath, sanitizePath(path)], (part) -> part? and part isnt "/").join("")
        # append query string from the given params
        urlBuilder(path, params)

  ]

app.filter "withContext", ["pathWithContext", (pathWithContext) ->
  (path) -> pathWithContext(path)
]
