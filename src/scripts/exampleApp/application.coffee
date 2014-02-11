# The entry point for the application

app = angular.module "exampleApp", [
  "ui.router"
  "ngSanitize"
  "pasvaz.bindonce"
  "blueimp.fileupload"
  "placeholders.txt"

  "angleGrinder.common"
  "angleGrinder.gridz"
  "angleGrinder.forms"
  "angleGrinder.alerts"
  "angleGrinder.spinner"

  "exampleApp.resources"
  "exampleApp.grids"
  "exampleApp.docs"
]

# Sample `pathWithContext` configuration block
app.config [
  "pathWithContextProvider", (pathWithContextProvider) ->
    contextPath = $("body").data("context-path")
    pathWithContextProvider.setContextPath(contextPath) if contextPath?
]

app.factory "httpErrorsInterceptor", [
  "$q", "$log", "alerts",
  ($q, $log, alerts) ->

    responseError: (response) ->
      errorMessage = response.data?.error || "Unexpected HTTP error"
      $log.debug "intercepting", errorMessage, response

      # skip validation errors
      alerts.error(errorMessage) if response.status isnt 422

      $q.reject(response)

]

app.config [
  "$httpProvider", ($httpProvider) ->
    # register http errors interceptor
    $httpProvider.interceptors.push("httpErrorsInterceptor")
]

# emulate slow loading tab template for `templates/examples/tabs/_slow.html`
app.config [
  "$httpProvider", ($httpProvider) ->

    $httpProvider.interceptors.push [
      "$q", "$timeout",
      ($q, $timeout) ->

        request: (request) ->
          if request.url is "templates/examples/tabs/_slow.html"
            deferred = $q.defer()

            $timeout ->
              deferred.resolve(request)
            , 1000

            $q.when(deferred.promise)
          else
            $q.when(request)
    ]
]

app.run [
  "$log", "alerts", ($log, alerts) ->

    # Catch all jquery xhr errors
    $(document).ajaxError (event, jqxhr, settings, exception) ->
      $log.error("Network error:", event, jqxhr, settings, exception)
      alerts.error(exception)

]
