/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var common = angular.module("angleGrinder.common", [
  "ui.bootstrap.modal",
  "ui.bootstrap.popover",
  "angleGrinder.resources",
  'duScroll' //Scroll
])

// change default locale to use `-` symbol for negative currencies
common.config(["$localeProvider", "$provide", function($localeProvider, $provide) {
  const defaultLocale = $localeProvider.$get()

  angular.extend(defaultLocale.NUMBER_FORMATS.PATTERNS[1], {
    negPre: "-",
    negSuf: ""
  }
  )

  return $provide.value("$locale", defaultLocale)
}
])

// Decorates `$http.pendingRequests` with some useful features
common.factory("pendingRequests", [
  "$http", function($http) {
    var pendingRequests = () => pendingRequests.any()

    // Returns true if any http request is in progress
    pendingRequests.any = () => pendingRequests.for("GET", "POST", "PUT", "PATCH", "DELETE")

    // Returns true if a http request with the given method is in progress
    pendingRequests.for = function(...httpMethods) {
      const requests = _.filter($http.pendingRequests, request => _.includes(httpMethods, request.method))
      return requests.length > 0
    }

    return pendingRequests
  }
])


// Camelizes the given string
common.value("camelize", str => str.replace(/(\-|\.|_|\s)+(.)?/g, function(match, p1, p2) {
  if (p2) { return p2.toUpperCase() } else { return "" }
}))

//Due to changes in angular 1.6 see https://docs.angularjs.org/guide/migration#commit-aa077e8
common.config(['$locationProvider', $locationProvider => $locationProvider.hashPrefix('')])

common.config(["$compileProvider", $compileProvider => $compileProvider.preAssignBindingsEnabled(true)])


