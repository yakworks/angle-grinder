common = angular.module("angleGrinder.common", [])

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
  _.isString(str) and _.isEmpty(str)

# Returns true if the given values if falsy
common.service "isFalsy", [
  "isEmpty", (isEmpty) ->
    (value) ->
      return true if _.isNaN(value)
      return true if isEmpty(value)
      return true if _.isNull(value)
      return true if _.isUndefined(value)
      return true if value is false

      return false
]

# Camelizes the given string
common.value "camelize", (str) ->
  str.replace /(\-|\.|_|\s)+(.)?/g, (match, p1, p2) ->
    if p2 then p2.toUpperCase() else ""
