mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateMixin", [
  "$log", "$parse", "$modal", "pathWithContext",
  ($log, $parse, $modal, pathWithContext) ->
    ($scope, args = {}) ->
      {gridName, templateUrl, controller, extraParams} = args
      controller ?= "MassUpdateFormCtrl"

      $scope.massUpdate = ->
        grid = $parse(gridName)($scope)
        throw new Error("the grid is not defined") unless grid?

        # ..grab selected row ids
        selectedIds = grid.getSelectedRowIds()
        return if selectedIds.length is 0

        $modal.open

          templateUrl: pathWithContext(templateUrl)
          controller: controller

          keyboard: false # do not close the dialog with ESC key
          backdrop: "static" # do not close on click outside of the dialog

          resolve:
            selectedIds: -> selectedIds
            grid: -> grid
            extraParams: -> extraParams

]
