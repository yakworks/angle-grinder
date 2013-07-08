class EditItemCtrl

  @$inject = ["$scope", "$rootScope", "dialog", "item", "createNew", "flatten"]
  constructor: ($scope, $rootScope, dialog, item, createNew, flatten) ->
    $scope.item = item
    $scope.createNew = createNew

    $scope.closeEditDialog = ->
      dialog.close($scope.item)

    $scope.save = ->
      item.save (response) ->
        # Flattening the object before insering it to the grid
        $rootScope.$broadcast("itemUpdated", flatten(response))
        $scope.closeEditDialog()

controllers = angular.module("angleGrinder.controllers")
controllers.controller("EditItemCtrl", EditItemCtrl)
