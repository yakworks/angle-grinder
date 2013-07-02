services = angular.module("angleGrinder.services")

services.service "editDialog", ($dialog) ->
  @open = (editTemplateUrl, item, createNew) ->
    dialog = $dialog.dialog
      backdropFade: false
      dialogFade: false
      resolve:
        item: -> item
        createNew: -> createNew

    # override so we can intercept form dirty and prevent escape
    dialog.handledEscapeKey = (e) ->
      if e.which is 27
        e.preventDefault()
        unless dialog.$scope.editForm.$dirty
          dialog.close()
          dialog.$scope.$apply()

    # override so we can intercept form dirty and prevent backdrop click
    dialog.handleBackDropClick = (e) ->
      e.preventDefault()
      unless dialog.$scope.editForm.$dirty
        dialog.close()
        dialog.$scope.$apply()

    dialog.open editTemplateUrl, "EditItemCtrl"
