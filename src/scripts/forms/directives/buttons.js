/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var forms = angular.module('angleGrinder.forms')

forms.directive('agCreateButton', () => ({
  restrict: 'E',
  replace: true,
  transclude: true,

  compile(element, attrs, trasclude) {
    return {
      pre(scope, element) {
        return trasclude(scope, function(clone) {
          // Append the default label
          if ($.trim(clone.text()) === '') { return element.append('Create') }
        })
      }
    }
  },

  template: `\
<a href="" class="btn">
  <i class="fa fa-pencil-square-o"></i>
  <span ng-transclude></span>
</a>\
`
}))

forms.directive('agCancelButton', () => ({
  restrict: 'E',
  replace: true,

  template: `\
<button type="button" class="btn">
  <i class="fa fa-times"></i> Cancel
</button>\
`
}))
