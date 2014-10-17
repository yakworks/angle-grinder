app = angular.module("angleGrinder.forms")

# TODO spec this directive
# Ability to provide custom template directly in the DOM
app.directive "editableCustom", [
  "editableDirectiveFactory", (editableDirectiveFactory) ->
    result = editableDirectiveFactory
      directiveName: "editableCustom"

    # Here be dragons...
    compile = result.compile
    result.compile = (element) ->
      # find template element, grab its html and remove it from the DOM
      templateEl = element.next("[editable-custom-template]")
      tpl = templateEl.html()
      templateEl.remove()

      compile.apply(this, arguments)

      # override linking function
      link = result.link
      return (scope, element, attrs, ctrl) ->
        # assign a template to the editable controller
        eCtrl = ctrl[0]
        eCtrl.inputTpl = tpl

        link.apply(this, arguments)

    return result
]
