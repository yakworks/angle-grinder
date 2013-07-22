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

spinner.directive "spinner", ->
  replace: true
  restrict: "E"
  template: """
    <li class="spinner">
      <a href="#">
        <img ng-show="showSpinner()" src="/images/ajax-loader.gif" />
      </a>
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
