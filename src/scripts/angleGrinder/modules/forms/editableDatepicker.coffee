forms = angular.module("angleGrinder.forms")

# TODO spec it
# x-editable wrapper for date picker with calendar button
forms.directive "editableDatepicker", [
  "editableDirectiveFactory", (editableDirectiveFactory) ->
    editableDirectiveFactory
      directiveName: "editableDatepicker"

      inputTpl: """
        <input type="text" ng-model="$data" datepicker-popup="MM/dd/yyyy" is-open="opened">
      """

      render: ->
        @parent.render.call(this)

        div = angular.element """
          <div class="input-prepend"></div>
        """

        # wrap it into div
        @inputEl.wrap(div)

        # add a button for opening the calendar
        @inputEl.after """
          <button type="button" class="btn btn-default" ng-click="open($event)">
            <i class="icon-calendar"></i>
          </button>
        """

      init: ->
        @parent.init.call(this)

        @scope.opened = false

        @scope.open = ($event) =>
          $event.preventDefault()
          $event.stopPropagation()

          @scope.opened = true
]
