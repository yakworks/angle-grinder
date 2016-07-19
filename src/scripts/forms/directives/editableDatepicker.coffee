forms = angular.module("angleGrinder.forms")

# x-editable wrapper for date picker with calendar button
forms.directive "editableDatepicker", [
  "editableDirectiveFactory", "$filter", (editableDirectiveFactory, $filter) ->
    editableDirectiveFactory
      directiveName: "editableDatepicker"

      inputTpl: """
       <ag-datepicker ng-model="$data"></ag-datepicker>
      """

      render: ->
        @parent.render.call(this)

]
