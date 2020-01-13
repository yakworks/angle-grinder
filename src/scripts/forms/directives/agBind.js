import angular from 'angular'
import formsModule from '../formsModule'

// Enhanced bind directive with default value
// Should be used with xeditable fields to show data in the view mode
angular.module(formsModule).directive('agBind', function() {
  return {
    restrict: 'A',

    controller() {
      this.showValue = value => angular.isNumber(value) || !!value

      return this
    },

    compile(element) {
      // grab the default value from the initial content
      const defaultValue = element.html() || '&nbsp;'

      return (scope, element, attrs, ctrl) => scope.$watch(attrs.agBind, function(value) {
        const txt = ctrl.showValue(value) ? value : defaultValue
        return element.html(txt)
      })
    }
  }
})
