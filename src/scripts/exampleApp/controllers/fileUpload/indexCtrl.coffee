class IndexCtrl extends BaseCtrl

  @register "exampleApp", "fileUpload.IndexCtrl"
  @inject "$scope", "$http"

  initialize: ->

    @$scope.queue = []

    @$scope.loadingFiles = true
    @$http.get("/api/upload/list").then (response) =>
      @$scope.queue = response.data.files || []
      @$scope.loadingFiles = false

class FileDestroyController extends BaseCtrl

  @register "exampleApp", "fileUpload.FileDestroyController"
  @inject "$scope", "$http"

  initialize: ->
    file = @$scope.file
    state = null

    if file.url
      file.$state = -> state

      file.$destroy = =>
        state = "pending"

        onSuccess = =>
          state = "resolved"
          @$scope.clear file

        onError = ->
          state = "rejected"

        @$http(url: file.deleteUrl, method: file.deleteType).then(onSuccess, onError)

    else if not file.$cancel and not file._index
      file.$cancel = -> @$scope.clear file
