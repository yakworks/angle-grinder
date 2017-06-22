common = angular.module("angleGrinder.common", [
  "ui.bootstrap.modal"
  "ui.bootstrap.popover"
  "angleGrinder.resources"
  'duScroll' #Scroll
])

# change default locale to use `-` symbol for negative currencies
common.config ["$localeProvider", "$provide", ($localeProvider, $provide) ->
  defaultLocale = $localeProvider.$get()

  angular.extend defaultLocale.NUMBER_FORMATS.PATTERNS[1],
    negPre: "-"
    negSuf: ""

  $provide.value "$locale", defaultLocale
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


# Camelizes the given string
common.value "camelize", (str) ->
  str.replace /(\-|\.|_|\s)+(.)?/g, (match, p1, p2) ->
    if p2 then p2.toUpperCase() else ""
