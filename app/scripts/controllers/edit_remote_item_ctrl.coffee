class EditRemoteItemCtrl

  @$inject = ["$scope", "$rootScope", "dialog", "item", "createNew"]
  constructor: ($scope, $rootScope, dialog, item, createNew) ->
    $scope.item = item
    $scope.createNew = createNew

    $scope.closeEditDialog = ->
      dialog.close($scope.item)

    $scope.save = ->
      $scope.saving = true

      onComplete = (response) ->
        $scope.saving = false
        $scope.closeEditDialog()
        $rootScope.$broadcast("itemUpdated", response)

      item.save(onComplete)

controllers = angular.module("angleGrinder.controllers")
controllers.controller("EditRemoteItemCtrl", EditRemoteItemCtrl)
