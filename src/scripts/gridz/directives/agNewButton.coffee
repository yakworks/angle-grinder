gridz = angular.module "angleGrinder.gridz"

gridz.directive "agNewButton", ["$compile", ($compile) ->
  restrict: "A"

  link: (scope, element, attrs) ->
    text = angular.element($compile("""<i class="fa fa-plus" uib-tooltip="Create new"></i> """)(scope))
    element.append(text)
]
