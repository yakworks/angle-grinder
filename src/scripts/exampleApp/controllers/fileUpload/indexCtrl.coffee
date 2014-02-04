class IndexCtrl

  @$inject = ["$scope", "$http"]
  constructor: ($scope, $http) ->

    $scope.queue = []

    $scope.loadingFiles = true
    $http.get("/api/upload/list").then (response) ->
      $scope.queue = response.data.files || []
      $scope.loadingFiles = false

class FileDestroyController

  @$inject = ["$scope", "$http"]
  constructor: ($scope, $http) ->
    file = $scope.file
    state = null

    if file.url
      file.$state = -> state

      file.$destroy = ->
        state = "pending"

        onSuccess = ->
          state = "resolved"
          $scope.clear file

        onError = ->
          state = "rejected"

        $http(url: file.deleteUrl, method: file.deleteType).then(onSuccess, onError)

    else if not file.$cancel and not file._index
      file.$cancel = -> $scope.clear file

angular.module("exampleApp")
  .controller("fileUpload.IndexCtrl", IndexCtrl)
  .controller("fileUpload.FileDestroyController", FileDestroyController)
