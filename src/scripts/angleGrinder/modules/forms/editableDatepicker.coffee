forms = angular.module("angleGrinder.forms")

# TODO spec it
# x-editable wrapper for date picker
forms.directive "editableDatepicker", [
  "editableDirectiveFactory", (editableDirectiveFactory) ->
    editableDirectiveFactory
      directiveName: "editableDatepicker"

      inputTpl: """
        <div class="input-prepend">
          <input type="text" ng-model="$data" datepicker-popup="MM/dd/yyyy" is-open="opened">
          <button type="button" class="btn btn-default" ng-click="open($event)">
            <i class="icon-calendar"></i>
          </button>
        </div>
      """

      init: ->
        @parent.init()

        @scope.opened = false

        @scope.open = ($event) =>
          $event.preventDefault()
          $event.stopPropagation()

          @scope.opened = true
]
