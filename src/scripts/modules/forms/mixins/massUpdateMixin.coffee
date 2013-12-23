mixin = angular.module("angleGrinder.forms")

mixin.factory "massUpdateMixin", [
  "$log", "$modal", "pathWithContext",
  ($log, $modal, pathWithContext) ->
    ($scope, args = {}) ->
      {gridName, templateUrl, controller} = args
      controller ?= "MassUpdateFormCtrl"

      $scope.massUpdate = ->
        grid = $scope[gridName]
        throw new Error("the grid is not defined") unless grid?

        # ..grab selected row ids
        selectedIds = grid.getSelectedRowIds()
        return if selectedIds.length is 0

        # ..and finally open the dialog
        $modal.open
          backdrop: "static"
          keyboard: false

          templateUrl: pathWithContext(templateUrl)
          controller: controller

          resolve:
            selectedIds: -> selectedIds
            grid: -> grid
]
