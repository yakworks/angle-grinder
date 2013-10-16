forms = angular.module("angleGrinder.forms")

forms.factory "massUpdateDialog", ["$dialog", "pathWithContext", ($dialog, pathWithContext) ->
  (options = {}) ->
    options.grid ?= ->
    options.templateUrl ?= ->
    options.controller ?= -> "MassUpdateFormCtrl"

    ->
      # Resolve variables
      grid = options.grid()
      throw new Error("grid is not defined") unless grid?

      templateUrl = pathWithContext(options.templateUrl())
      controller = options.controller()

      # ..grab selected row ids
      selectedIds = grid.getSelectedRowIds()
      return if selectedIds.length is 0

      dialog = $dialog.dialog
        backdropFade: false
        dialogFade: false
        resolve:
          selectedIds: -> selectedIds
          grid: -> grid

      # ..and finally open the dialog
      dialog.open(templateUrl, controller)
]
