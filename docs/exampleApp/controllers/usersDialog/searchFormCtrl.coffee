class SearchFormCtrl extends BaseCtrl

  @register "exampleApp", "usersDialog.SearchFormCtrl"
  @inject "$scope"

  initialize: ->

    @$scope.userTypeSelectOptions =
      multiple: true
      simple_tags: true
      tags: ["admin", "customer"]

