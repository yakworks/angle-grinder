/*
 * decaffeinate suggestions:
 * DS101: Remove unnecessary use of Array.from
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const forms = angular.module("angleGrinder.forms");

// Service for updating grid rows
// result should contain two arrays:
//   result.data - data for successfully updated rows
//   result.errors - assoc array for errors (id => errors)
forms.factory("MassUpdateHandler", [
  "$log", "alerts", ($log, alerts) => (function(grid, result) {
  let error, message;
  $log.info("[forms] Mass update response", result);

  // handle updated fields
  if (result.data?) {
    for (let row of Array.from(result.data)) { grid.updateRow(row.id, row, false); }
  } else {
    $log.warn("[forms] Invalid JSON response, missing data array");
  }

  // handle fields with errors
  if (result.errors?) {
    for (let id in result.errors) { error = result.errors[id]; grid.flashOnError(id); }
    // make sure errors is an array instance
    if (result.errors instanceof Array) {
      if (result.errors.length === 0) {
        alerts.info("Mass update completed successfully");
        return;
      }
      for (error of Array.from(result.errors)) {
        message = ": ";
        for (let errorKey in error.errors) {
          // get failed instance (should be object)
          const errorValue = error.errors[errorKey];
          if (typeof errorValue === "object") {
            for (let msgKey in errorValue) {
              // error messages are strings
              const msgValue = errorValue[msgKey];
              if (typeof msgValue === "string") {
                // build message
                const separator = message.length > 2 ? "\n" : "";
                message = `${message}${separator}${msgValue}`;
              }
            }
          }
        }
        alerts.error(message);
      }
    }
  } else {
    $log.warn("[forms] Invalid JSON response, missing errors assoc array");
    alerts.info("Mass update completed successfully");
  }

  if (result.message) {
    return alerts.error(result.message);
  }
})
]);
