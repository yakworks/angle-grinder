#Fixes bug with select(when user clicks on element in dropdown list but it selects above element) on old versions of IE.
app = angular.module "angleGrinder.common"

app.directive "ieSelectFix", ["$window",  ($window) ->
  restrict: "A"
  link: (scope, elem, attrs) ->
    elem.bind "change", (event) ->
      if $window.navigator.userAgent.indexOf("MSIE 9") > 0
        option.parentNode.insertBefore(option, option) for option in elem
]
