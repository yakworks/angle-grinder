mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateMixin", [
  "$log", "$parse", "$dialog", "pathWithContext",
  ($log, $parse, $dialog, pathWithContext) ->
    ($scope, args = {}) ->
      {gridName, templateUrl, controller} = args
      controller ?= "MassUpdateFormCtrl"

      $scope.massUpdate = ->
        grid = $parse(gridName)($scope)
        throw new Error("the grid is not defined") unless grid?

        # ..grab selected row ids
        selectedIds = grid.getSelectedRowIds()
        return if selectedIds.length is 0

        dialog = $dialog.dialog
          backdropFade: false
          dialogFade: false
          resolve:
            selectedIds: -> selectedIds
            grid: -> grid

        # ..and finally open the dialog
        dialog.open(pathWithContext(templateUrl), controller)
]
