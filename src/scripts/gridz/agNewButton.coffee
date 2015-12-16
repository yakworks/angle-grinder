gridz = angular.module "angleGrinder.gridz"

gridz.directive "agNewButton", ["$compile", ($compile) ->
  restrict: "A"

  link: (scope, element, attrs) ->
    text = angular.element($compile("""<i class="icon-plus" tooltip="Create new"> New</i> """)(scope))
    element.append(text)
]