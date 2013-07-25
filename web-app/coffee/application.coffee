# The main scaffolding module
app = angular.module "angleGrinder", [
  "angleGrinder.common"
  "angleGrinder.gridz"
  "angleGrinder.forms"
  "angleGrinder.alerts"
  "angleGrinder.spinner"
  "ui.select2"

  "angleGrinder.resources"
]

# Configure the context path
app.config [
  "pathWithContextProvider", (pathWithContextProvider) ->
    contextPath = $("body").data("context-path")
    pathWithContextProvider.setContextPath(contextPath) if contextPath?
]

# Catch all jquery xhr errors
app.run [
  "$log", "alerts", ($log, alerts) ->
    $(document).ajaxError (event, jqxhr, settings, exception) ->
      $log.error("Network error:", event, jqxhr, settings, exception)
      alerts.error(exception)
]
