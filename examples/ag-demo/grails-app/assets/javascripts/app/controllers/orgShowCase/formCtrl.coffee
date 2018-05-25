class FormCtrl

  @$inject = ["$scope", "$http", "pathWithContext", "orgSelectOptions"]
  constructor: ($scope, $http, pathWithContext, orgSelectOptions) ->
    $scope.save = (form, orgShowCase)->
      orgShowCase.$save()

    $scope.orgSelectOptions = orgSelectOptions()

angular.module("admin.org")
  .controller("orgShowCase.FormCtrl", FormCtrl)
