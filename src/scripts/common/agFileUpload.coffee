app = angular.module "angleGrinder.common"

app.directive "agFileUpload", ->
  restrict: "A"
  require: "ngModel"

  link: (scope, elem, attrs, ctrl) ->
    elem.bind "change", (event) ->
      scope.$apply (self) ->
        ctrl.$setViewValue(elem.val())
        ctrl.$render()
        self[attrs.agFileUpload](event)
