alerts = angular.module("angleGrinder.alerts", [])

alerts.value "alertTimeout", 3000

class Alerts
  @$inject = ["$log", "$timeout", "alertTimeout"]
  constructor: (@$log, @$timeout, @alertTimeout) ->
    @lastId = 0
    @messages = []

  # Returns a next id for the new message
  nextId: ->
    @lastId += 1

  push: (type, text) ->
    id = @nextId()
    @$log.info("Alert [#{id}, #{type}]", text)

    @messages.push(id: id, type: type, text: text)
    @delayedDispose(id)

    id

  # Helper methods for various alerts types
  info: (text) -> @push("info", text)
  error: (text) -> @push("error", text)

  # Disposes a message with the given id
  dispose: (id) ->
    at = _(@messages.map((message) -> message.id)).indexOf(id)
    @messages.splice(at, 1)

  # Dispose the message after the given time in milliseconds
  delayedDispose: (id) ->
    if @alertTimeout? and @alertTimeout > 0
      disposeTheAlert = =>
        @$log.info("Disposing alert", id, "after", @alertTimeout, "milliseconds")
        @dispose(id)
      @$timeout(disposeTheAlert, @alertTimeout)

alerts.service "alerts", Alerts

alerts.controller "alerts", [
  "$scope", "alerts",
  ($scope, alerts) ->
    $scope.alertMessages = alerts.messages

    $scope.disposeAlert = (id) ->
      alerts.dispose(id)

    $scope.setTimeout = (timeout) ->
      alerts.alertTimeout = timeout if timeout
]

alerts.directive "agAlerts", ->
  link: (scope, element, attrs) ->
    scope.setTimeout(attrs.timeout)
    if !!attrs.fixed
      scope.fixed = attrs.fixed

  restrict: "E"
  replace: true

  template: """
    <aside id="alerts">
      <div ng-repeat="message in alertMessages" ng-class="{'fixed-alert': !!fixed}" class="alert alert-{{message.type}}" style="margin-top: {{fixed || 0}}px ;top: {{50 * $index}}px">
        <button ng-click="disposeAlert(message.id)" type="button" class="close">×</button>
        <strong>{{message.type}}</strong> <span>{{message.text}}</span>
      </div>
    </aside>
  """

  controller: "alerts"
