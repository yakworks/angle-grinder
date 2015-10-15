forms = angular.module("angleGrinder.forms")

# x-editable wrapper for date picker with calendar button
forms.directive "editableDatepicker", [
  "editableDirectiveFactory", "$filter", (editableDirectiveFactory, $filter) ->
    editableDirectiveFactory
      directiveName: "editableDatepicker"

      inputTpl: """
        <input type="text" style='width: 135px' class="form-control" ng-model="$data" datepicker-popup="MM/dd/yyyy" is-open="opened" ng-readonly="disabled">
      """

      render: ->
        @parent.render.call(this)

        div = angular.element """
          <div class="input-group"></div>
        """

        # wrap it into div
        @inputEl.wrap(div)

        # add a button for opening the calendar
        @inputEl.after """
          <button type="button" class="btn btn-default input-group-addon" ng-click="open($event)" ng-disabled="disabled">
            <i style="padding: 1px; margin-left: -7px" class="fa fa-calendar"></i>
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
