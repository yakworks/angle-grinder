app = angular.module "angleGrinder.common"

# Enhanced bind directive with default value
# Should be used with xeditable fields to show data in the view mode
app.directive "agBind", ->
  restrict: "A"

  controller: ->

    @showValue = (value) ->
      angular.isNumber(value) or !!value

    return this

  compile: (element) ->
    # grab the default value from the initial content
    defaultValue = element.html() or "&nbsp;"

    (scope, element, attrs, ctrl) ->

      scope.$watch attrs.agBind, (value) ->
        txt = if ctrl.showValue(value) then value else defaultValue
        element.html(txt)
