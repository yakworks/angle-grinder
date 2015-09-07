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
        # make sure errors is an array instance
        if result.errors instanceof Array
          for error in result.errors
            message = ": "
            for errorKey, errorValue of error.errors
              # get failed instance (should be object)
              if typeof errorValue is "object"
                for msgKey, msgValue of errorValue
                  # error messages are strings
                  if typeof msgValue is "string"
                    # build message
                    separator = if message.length > 2 then "\n" else ""
                    message = "#{message}#{separator}#{msgValue}"
            alerts.error message
      else
        $log.warn "[forms] Invalid JSON response, missing errors assoc array"

      if result.message
        alerts.error(result.message)
]
