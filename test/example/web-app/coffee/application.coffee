# Generic $resource error handler used by all controllers.
# TODO Remove it from the global namespace, create ng service?
window.errorHandler = ($scope, Flash, response) ->
  switch response.status
    when 404 # resource not found - return to the list and display message returned by the controller
      Flash.error response.data.message
    when 409 # optimistic locking failure - display error message on the page
      $scope.message =
        level: "error"
        text: response.data.message
    when 400 # validation error - display errors alongside form fields
      $scope.saving = false
      $scope.message =
        level: "error"
        text: response.data.message

      $scope.errors = response.data.errors
    else # TODO: general error handling

# Utils
Function::curry = ->
  return this  if arguments.length < 1
  self = this
  args = Array::slice.call(arguments)
  ->
    self.apply this, args.concat(toArray(arguments))

# The main scaffolding module
app = angular.module "admin", [
  "admin.resources"
  "angleGrinder.gridz"
  "angleGrinder.forms"
  "angleGrinder.alerts"
]
