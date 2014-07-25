class IndexCtrl extends BaseCtrl

  @register "exampleApp", "panels.IndexCtrl"
  @inject "$scope"

  initialize: ->
    @$scope.title = "Panels"

    @$scope.contents = []

    @$scope.addContent = =>
      content = { body: "new row [#{new Date()}]" }
      @$scope.contents.push(content)

    @$scope.removeContent = =>
      @$scope.contents.pop()
