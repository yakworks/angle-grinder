import angular from 'angular'

var app = angular.module('ag.xeditable')

// x-editable wrapper for date picker with calendar button
app.directive('editableDatepicker', function(editableDirectiveFactory, $filter) {
  'ngInject';
  return editableDirectiveFactory({
    directiveName: 'editableDatepicker',

    inputTpl: '<ag-datepicker label="" is-expanded ng-model="$data"></ag-datepicker>',

    render() {
      return this.parent.render.call(this)
    }
  })
}
)
