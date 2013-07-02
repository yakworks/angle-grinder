class EditItemCtrl

  @$inject = ["$scope", "$rootScope", "dialog", "item", "createNew"]
  constructor: ($scope, $rootScope, dialog, item, createNew) ->
    $scope.item = item
    $scope.createNew = createNew

    $scope.closeEditDialog = ->
      dialog.close($scope.item)

    $scope.save = ->
      generateId = -> new Date().getTime()
      $scope.item.id = generateId() unless $scope.item.id?

      $rootScope.$broadcast("itemUpdated", $scope.item)
      $scope.closeEditDialog()

controllers = angular.module("angleGrinder.controllers")
controllers.controller("EditItemCtrl", EditItemCtrl)
