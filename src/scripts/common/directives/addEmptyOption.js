import angular from 'angular'
import commonModule from '../commonModule'
import _ from 'lodash'

angular.module(commonModule).directive('addEmptyOption', () => ({
  restrict: 'A',
  scope: { addEmptyOption: '=' },

  link(scope, element, attrs) {
    const emptyOption = !_.isNil(attrs.emptyOption) ? JSON.parse(attrs.emptyOption.replace(/[']/g, '"')) : { id: '', name: '' }
    element.prepend(angular.element(`<option value=''>${emptyOption.name}</option>`))
    if (!_.isNil(scope.addEmptyOption) && (scope.addEmptyOption.length > 0)) {
      if (!_.find(scope.addEmptyOption, { id: emptyOption.id })) { return scope.addEmptyOption.unshift(emptyOption) }
    }
  }
}))
