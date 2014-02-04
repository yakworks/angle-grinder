forms = angular.module("angleGrinder.forms")

# Sets focus on the element with the given name
# Works in conjunction with `agFocus` directive
forms.factory "focus", ["$rootScope", "$timeout", ($rootScope, $timeout) ->
  (name) -> $timeout -> $rootScope.$broadcast "focusOn", name
]

# Sets the focus on the element
# TODO change it to `focus-if`
# TODO see http://ruoyusun.com/2013/08/24/a-glimpse-of-angularjs-scope-via-example.html
forms.directive "agFocus", ->
  restrict: "A"

  link: (scope, element, attributes) ->
    currentName = attributes.agFocus

    scope.$on "focusOn", (event, name) ->
      if currentName is name
        element.addClass "ag-focused"
        element[0].focus()
