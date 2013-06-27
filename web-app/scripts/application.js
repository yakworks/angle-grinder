/**
 * Utils
 */
function toArray(element) {
  return Array.prototype.slice.call(element);
}

Function.prototype.curry = function() {
  if (arguments.length < 1) {
    return this; //nothing to curry with - return function
  }

  var self = this;
  var args = toArray(arguments);
  return function() {
    return self.apply(this, args.concat(toArray(arguments)));
  }
}

/**
 * Generic $resource error handler used by all controllers.
 * TODO Remove it from the global namespace, create ng service?
 */
function errorHandler($scope, Flash, response) {
  switch (response.status) {
    case 404: // resource not found - return to the list and display message returned by the controller
      Flash.error(response.data.message);
      break;
    case 409: // optimistic locking failure - display error message on the page
      $scope.message = {level: "error", text: response.data.message};
      break;
    case 400: // validation error - display errors alongside form fields
      $scope.saving = false
      $scope.message = {level: "error", text: response.data.message};
      $scope.errors = response.data.errors;
      break;
    default: // TODO: general error handling
  }
}

/**
 * The main scaffolding module.
 */
angular.module("admin", [
  "admin.controllers",
  "admin.directives",
  "ui.bootstrap",
  "ui"
]);
