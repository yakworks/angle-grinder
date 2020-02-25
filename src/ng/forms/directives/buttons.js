import angular from 'angular'
import formsModule from '../formsModule'

var forms = angular.module(formsModule)

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
