# Adds an empty option to select dropdaown.
app = angular.module "angleGrinder.common"

app.directive "addEmptyOption", ->
  restrict: "A"
  scope:
    addEmptyOption: "="
  link: (scope, element, attrs) ->
    emptyOption = if (attrs.emptyOption?) then JSON.parse(attrs.emptyOption.replace(/[']/g, "\"")) else {id: "", name:""}
    element.prepend(angular.element("<option value=''>#{emptyOption.name}</option>"))
    if (scope.addEmptyOption? and scope.addEmptyOption.length > 0)
      scope.addEmptyOption.unshift(emptyOption) unless (_.find(scope.addEmptyOption, id: emptyOption.id))
