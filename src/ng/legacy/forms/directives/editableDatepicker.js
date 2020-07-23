import angular from 'angular'
import formsModule from '../formsModule'

var forms = angular.module(formsModule)

// x-editable wrapper for date picker with calendar button
forms.directive('editableDatepicker', function(editableDirectiveFactory, $filter) {
  return editableDirectiveFactory({
    directiveName: 'editableDatepicker',

    inputTpl: '<ag-datepicker label="" is-expanded ng-model="$data"></ag-datepicker>',

    render() {
      return this.parent.render.call(this)
    }
  })
}
)
