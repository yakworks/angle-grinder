module = angular.module("admin.controllers", ["admin.services"])

module.controller "ListCtrl", ($scope, $rootScope, $routeParams, $location, Grails, Flash, EditDialog) ->
  $scope.createDialog = ->
    $scope.item = new Grails
    EditDialog.open $scope.editTemplateUrl, $scope.item, true

  $scope.editDialog = (id) ->

    # clear errors
    $scope.errors = null
    $scope.dataLoaded = false

    onSuccess = (item) ->
      $scope.item = item
      $scope.dataLoaded = true
      EditDialog.open $scope.editTemplateUrl, $scope.item, false

    Grails.get id: id, onSuccess, window.errorHandler.curry($scope, Flash)

  $scope.quickSearch = (search) ->
    $rootScope.$broadcast "searchUpdated", search

# dialog is the passed in instance from the angualr-ui dialog
module.controller "EditItemController", ($scope, $rootScope, dialog, item, isCreateNew, Flash) ->
  $scope.item = item
  $scope.isCreateNew = isCreateNew
  $scope.closeEditDialog = ->
    dialog.close()

  $scope.save = (item) ->
    $scope.saving = true
    item.$save ((response) ->
      $scope.closeEditDialog()
      $rootScope.$broadcast "itemUpdated", response
    ), window.errorHandler.curry($scope, Flash)
