common = angular.module("angleGrinder.common", [])

common.value "pathWithContext", (path, context) ->
  path = path.replace /^\/*/, ""
  context = context.replace /\/*$/, ""

  [context, path].join("/")
