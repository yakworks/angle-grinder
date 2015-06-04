forms = angular.module("angleGrinder.forms")

# Wrapper for angular-ui/bootstrap datepicker popup.
# It decorates an input with calendar button.
forms.directive "agDatepicker", [
  "$compile", ($compile) ->
    restrict: "A"
    replace: true
    scope: true
    transclude: true

    controller: [
      "$scope", "$rootScope", ($scope, $rootScope) ->

        # initially the datepicker is closed
        $scope.opened = false

        # open the popup with the datepicker
        $scope.open = ($event) ->
          $event.preventDefault()
          $event.stopPropagation()

          $scope.opened = true

          # force to close other opened datepickers
          $rootScope.$broadcast "ag:closeOtherPickers", $scope.$id

        # dirty way of closing other datepickers
        $rootScope.$on "ag:closeOtherPickers", (event, otherId) ->
          $scope.opened = false if $scope.$id isnt otherId
    ]

    compile: (element, attrs, transclude) ->
      (scope, element) ->

        # manually transclude the element
        # grab the input element and decorate it with useful stuff
        transclude scope, (clone) ->

          angular.forEach(clone, (child) ->
            if child.localName == "input"
              angular.forEach(child.attributes, (attribute) ->
                if attribute.name == "ng-disabled"
                  scope.disabled = attribute.value
              )
          )
          # dynamically add `datepicker-popup` to the input
          clone.attr("datepicker-popup", "MM/dd/yyyy")
          # ..and wire it with `opened` scope variable
          clone.attr("is-open", "opened")

          $compile(clone) scope, (clone) ->
            element.prepend(clone)

    template: """
      <div class="input-append ag-datepicker">

        <button type="button" class="btn btn-default" ng-click="open($event)" ng-disabled="disabled">
          <i class="icon-calendar"></i>
        </button>
      </div>
    """
]
