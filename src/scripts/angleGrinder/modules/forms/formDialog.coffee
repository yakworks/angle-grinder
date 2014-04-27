forms = angular.module("angleGrinder.forms")

# Opens a modal dialog with embeded generic form for
# create or update an item
forms.factory "formDialog", [
  "$dialog", "pathWithContext",
  ($dialog, pathWithContext) ->

    open: (templateUrl, dialogOptions = {}) ->
      dialog = $dialog.dialog
        backdropFade: false
        dialogFade: false
        resolve: dialogOptions: -> dialogOptions

      # override so we can intercept form dirty and prevent escape
      dialog.handledEscapeKey = (e) ->
        dialog.handleBackDropClick(e) if e.which is 27

      # override so we can intercept form dirty and prevent backdrop click
      dialog.handleBackDropClick = (e) ->
        e.preventDefault()

        formCtrl = dialog.form
        if formCtrl? and not formCtrl.$dirty
          dialog.close()
          dialog.$scope.$apply()

      dialog.open(pathWithContext(templateUrl), "FormDialogCtrl")

]
