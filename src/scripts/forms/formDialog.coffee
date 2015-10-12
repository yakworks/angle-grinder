forms = angular.module("angleGrinder.forms")

# Opens a modal dialog with embedded generic form for
# create or update record
forms.factory "formDialog", [
  "$uibModal", "pathWithContext",
  ($modal, pathWithContext) ->

    open: (templateUrl, dialogOptions = {}) ->

      scope = dialogOptions.scope if angular.isDefined(dialogOptions.scope)

      $modal.open
        templateUrl: pathWithContext(templateUrl)
        controller: "FormDialogCtrl"
        keyboard: false # do not close the dialog with ESC key
        backdrop: "static" # do not close on click outside of the dialog
        scope: scope

        resolve:
          dialogOptions: -> dialogOptions
]
