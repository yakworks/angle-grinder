class FormCtrl

  @$inject = ["$scope", "$http", "pathWithContext"]
  constructor: ($scope, $http, pathWithContext) ->
    $scope.save = (form, orgShowCase)->
      orgShowCase.$save()




angular.module("angleGrinder")
  .controller("orgShowCase.FormCtrl", FormCtrl)
