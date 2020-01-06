/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var forms = angular.module("angleGrinder.forms")

// x-editable wrapper for date picker with calendar button
forms.directive("editableDatepicker", [
  "editableDirectiveFactory", "$filter", function(editableDirectiveFactory, $filter) {
    return editableDirectiveFactory({
      directiveName: "editableDatepicker",

      inputTpl: `\
<ag-datepicker ng-model="$data" datepicker-options="{{options}}"></ag-datepicker>\
`,

      render() {
        return this.parent.render.call(this)
      }
    })
  }

])
