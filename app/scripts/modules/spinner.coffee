spinner = angular.module("angleGrinder.spinner", [])

spinner.factory "httpRequestTracker", [
  "$http", ($http) ->
    jqueryAjaxRequest: false,

    hasPendingRequests: ->
      @jqueryAjaxRequest or $http.pendingRequests.length > 0
]

class SpinnerCtrl
  @$inject = ["$scope", "httpRequestTracker"]
  constructor: (@$scope, @httpRequestTracker) ->
    @$scope.showSpinner = @showSpinner

  showSpinner: =>
    @httpRequestTracker.hasPendingRequests()

spinner.controller "spinner", SpinnerCtrl

###
Use css to set the spinner annimation image:
```
  li.spinner i.spin:before {
    content: url('/images/ajax-loader.gif');
  }
```
###
spinner.directive "spinner", ->
  replace: true
  restrict: "E"
  template: """
    <li class="spinner">
      <a href="#"><i ng-class="{spin: showSpinner()}"></i></a>
    </li>
  """
  controller: "spinner"

# Notify the spinner service on jQuery ajax requests
spinner.run [
  "$timeout", "httpRequestTracker", ($timeout, httpRequestTracker) ->
    return if not jQuery?

    jqeuryAjaxRequest = (pending) ->
      $timeout -> httpRequestTracker.jqueryAjaxRequest = pending

    jQuery(document).ajaxStart -> jqeuryAjaxRequest(true)
    jQuery(document).ajaxStop  -> jqeuryAjaxRequest(false)
]
