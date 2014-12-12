gridz = angular.module "angleGrinder.gridz"

gridz.factory "actionPopupHandler", [
  "$log", ($log) ->

    (gridEl, scope, attrs) ->
      # handles an action from the `actionPopup` menu
      handleAction = (action, id) ->
        if scope[action]?
          $log.info "Trigger '#{action}' for row '#{id}'"
          scope.$apply -> scope[action](id)
        else
          $log.warn("`$scope.#{action}` is not defined")

      # handles click on show action inside the dropdown menu
      gridEl.on "showAction", (event, id) ->
        event.preventDefault()
        action = if attrs.showAction then attrs.showAction else "showRecord"
        handleAction(action, id)

      # handles click on edit action inside the dropdown menu
      gridEl.on "editAction", (event, id) ->
        event.preventDefault()
        action = if attrs.editAction then attrs.editAction else "editRecord"
        handleAction(action, id)

      # handles click on delete action inside the dropdown menu
      gridEl.on "deleteAction", (event, id) ->
        event.preventDefault()
        action = if attrs.deleteAction then attrs.deleteAction else "deleteRecord"
        handleAction(action, id)

      # handles click on the cell with `editActionLink` formatter
      gridEl.on "click", "a.editActionLink", (event) ->
        event.preventDefault()
        id = $(this).parents("tr:first").attr("id")
        action = if attrs.editAction then attrs.editAction else "editRecord"
        handleAction(action, id)
]
