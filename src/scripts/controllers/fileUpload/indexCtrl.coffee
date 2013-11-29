class IndexCtrl

  @$inject = ["$scope", "$http"]
  constructor: ($scope, $http) ->

    loadUploadedFiles = ->
      $http.get("/api/upload/list").then (response) ->
        $scope.files = response.data.files

    loadUploadedFiles()

    $("#fileupload").fileupload
      dataType: "json"
      done: (e, data) ->
        console.log data
        loadUploadedFiles()

angular.module("angleGrinder.examples")
  .controller("fileUpload.IndexCtrl", IndexCtrl)
