class AgGridDirectiveCtrl

  @$inject = ["$scope", "sampleData"]
  constructor: ($scope, sampleData) ->

controllers = angular.module("angleGrinder.controllers")
controllers.controller("AgGridDirectiveCtrl", AgGridDirectiveCtrl)
