/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module('angleGrinder.common')
// Enhanced bind directive with default value
// For editable select fields
app.directive('agSelectBind', ['$filter', '$parse', function($filter, $parse) {
  return {
    restrict: 'A',

    controller() {
      this.showValue = value => angular.isNumber(value) || !!value

      this.getField = function(objects, id, field, scope) {
        objects = $parse(objects)(scope)
        if ((id % 1) === 0) { id = angular.fromJson(id) }
        const element = $filter('filter')(objects, { id }, true)
        if (!_.isNil(element) && (element.length > 0)) { return element[0][field] } else { return '' }
      }

      return this
    },

    compile(element) {
      // grab the default value from the initial content
      const defaultValue = element.html() || '&nbsp;'

      return function(scope, element, attrs, ctrl) {
        const field = attrs.agSelectBindField
        return scope.$watch(attrs.agSelectBind, function(value) {
          const txt = ctrl.showValue(value) ? ctrl.getField(attrs.agSelectBindFor, value, field, scope) : defaultValue
          return element.html(txt)
        })
      }
    }
  }
}
])
