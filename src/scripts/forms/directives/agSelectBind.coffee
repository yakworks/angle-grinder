app = angular.module "angleGrinder.common"
# Enhanced bind directive with default value
# For editable select fields
app.directive "agSelectBind", ["$filter", "$parse", ($filter, $parse) ->
  restrict: "A"

  controller: ->
    @showValue = (value) ->
      angular.isNumber(value) or !!value

    @getField = (objects, id, field, scope) ->
      objects = $parse(objects)(scope)
      id = angular.fromJson(id) if (id % 1 is 0)
      element = $filter('filter')(objects, {id: id}, true)
      if (element? and (element.length > 0)) then element[0][field] else ""

    return this

  compile: (element) ->
    # grab the default value from the initial content
    defaultValue = element.html() or "&nbsp;"

    (scope, element, attrs, ctrl) ->

      field = attrs.agSelectBindField
      scope.$watch attrs.agSelectBind, (value) ->
        txt = if ctrl.showValue(value) then ctrl.getField(attrs.agSelectBindFor, value, field, scope) else defaultValue
        element.html(txt)
]
