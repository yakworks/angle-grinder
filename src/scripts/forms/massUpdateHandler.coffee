forms = angular.module("angleGrinder.forms")

# Service for updating grid rows
# result should contain two arrays:
#   result.data - data for successfully updated rows
#   result.errors - assoc array for errors (id => errors)
forms.factory "massUpdateHandler", [
  "$log", "alerts", ($log, alerts) ->
    (grid, result) ->
      $log.info "[forms] Mass update response", result

      # handle updated fields
      if result.data?
        grid.updateRow(row.id, row) for row in result.data
      else
        $log.warn "[forms] Invalid JSON response, missing data array"

      # handle fields with errors
      if result.errors?
        grid.flashOnError(id) for id, error of result.errors
        for error in result.errors
          alerts.error error.message
      else
        $log.warn "[forms] Invalid JSON response, missing errors assoc array"

      if result.message
        alerts.error(result.message)
]
