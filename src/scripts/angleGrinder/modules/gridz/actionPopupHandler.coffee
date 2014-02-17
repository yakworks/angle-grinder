gridz = angular.module "angleGrinder.gridz"

gridz.factory "actionPopupHandler", [
  "$log", ($log) ->

    ($grid, scope) ->
      # handles an action from the `actionPopup` menu
      handleAction = (action, id) ->
        if scope[action]?
          $log.info "Trigger '#{action}' for row '#{id}'"
          scope.$apply -> scope[action](id)
        else
          $log.warn("`$scope.#{action}` is not defined")

      # handles click on show action insite the dropdown menu
      $grid.on "showAction", (event, id) ->
        event.preventDefault()
        handleAction("showItem", id)

      # handles click on edit action insite the dropdown menu
      $grid.on "editAction", (event, id) ->
        event.preventDefault()
        handleAction("editItem", id)

      # handles click on delete action inside the dropdown menu
      $grid.on "deleteAction", (event, id) ->
        event.preventDefault()
        handleAction("deleteItem", id)

      # handles click on the cell with `editActionLink` formatter
      $grid.on "click", "a.editActionLink", (event) ->
        event.preventDefault()
        id = $(this).parents("tr:first").attr("id")
        handleAction("editItem", id)
]
