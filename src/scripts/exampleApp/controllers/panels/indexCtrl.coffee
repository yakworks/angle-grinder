class IndexCtrl extends BaseCtrl

  @register "exampleApp", "panels.IndexCtrl"
  @inject "$scope"

  initialize: ->
    @$scope.title = "Panels"
