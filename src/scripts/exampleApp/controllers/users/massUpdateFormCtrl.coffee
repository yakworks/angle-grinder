class MassUpdateFormCtrl extends BaseCtrl

  @register "exampleApp", "users.MassUpdateFormCtrl"
  @inject "$scope", "massUpdateFormCtrlMixin", "dialog", "Users", "selectedIds", "grid"

  initialize: ->

    @massUpdateFormCtrlMixin @$scope,
      dialog: @dialog
      Resource: @Users
      selectedIds: @selectedIds
      grid: @grid

    # Assign default value for all records
    @$scope.records = creditInfo: allowance: 0
