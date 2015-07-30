class IndexCtrl extends BaseCtrl

  @register "exampleApp", "tabs.IndexCtrl"
  @inject "$scope", "$templateCache",  "$log"

  initialize: ->
    @expose @$scope, "save"

    # remove tab templates from the cache
    _.each ["_first", "_second", "_third"], (name) =>
      @$templateCache.remove "templates/tabs/#{name}.html"

    @$scope.second = title: "The Second Tab"
    @$scope.third = title: "The Third Tab"
    @$scope.item = name: "Foo"
    @$scope.birthDate = new Date()

    @$scope.user = {}
    @$scope.user.birthDate = "2015-05-22T23:00:00+0200"
    @$scope.price = 99990001.98001

  save: (item, form) ->
    @$log.debug "[tabs] saving", item
