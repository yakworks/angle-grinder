# The main scaffolding module
app = angular.module "angleGrinder", [
  "ngResource"
  "ngRoute"

  "angleGrinder.common"
  "angleGrinder.gridz"
  "angleGrinder.forms"
  "angleGrinder.alerts"
  "angleGrinder.spinner"
  "ui.select2"

  "angleGrinder.resources"
]

app.config [
  "$httpProvider", "pathWithContextProvider", ($httpProvider, pathWithContextProvider) ->
    # Intercept all http errors
    $httpProvider.responseInterceptors.push("httpErrorsInterceptor")

    # Configure the context path
    contextPath = $("body").data("context-path")
    pathWithContextProvider.setContextPath(contextPath) if contextPath?
]

# Intercepts all HTTP errors and displays a flash message
app.factory "httpErrorsInterceptor", [
  "$injector", "$q", "alerts", ($injector, $q, alerts) ->
    (promise) ->
      $http = $injector.get("$http")

      onError = (response) ->
        errorMessage = response.data?.error || "Unexpected HTTP error"

        # skip validation errors
        alerts.error(errorMessage) if response.status isnt 422

        $q.reject(response)

      promise.then(null, onError)
]

# Catch all jquery xhr errors
app.run [
  "$log", "alerts", ($log, alerts) ->
    $(document).ajaxError (event, jqxhr, settings, exception) ->
      $log.error("Network error:", event, jqxhr, settings, exception)
      alerts.error(exception)
]
