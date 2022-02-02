import angular from 'angular'
import uiRouter from 'angular-ui-router'
import 'angular-breadcrumb' // 'ncy-angular-breadcrumb'
import stateHelperInit from './stateHelperInit'

const MOD_NAME = 'ui.router.stateHelper'
export default MOD_NAME

angular.module(MOD_NAME, [
  uiRouter,
  'ncy-angular-breadcrumb'
])
  .provider('stateHelper', function($stateProvider) {
    'ngInject';
    var self = this

    /**
     * Recursively sets the states using $stateProvider.state.
     * Child states are defined via a `children` property.
     * Call
     *
     * 1. Recursively calls itself for all descendant states, by traversing the `children` properties.
     * 2. Converts all the state names to dot notation, of the form `grandfather.father.state`.
     * 3. Sets `parent` property of the descendant states.
     *
     * @param {Object} state - The state route menu tree
     * @param {Object} [options] - An optional options object.
     * @param {Boolean} [options.keepOriginalNames=false] An optional flag that
     *     prevents conversion of names to dot notation if true.
     * @param {Boolean} [options.siblingTraversal=false] An optional flag that
     *     adds `nextSibling` and `previousSibling` properties when enabled
     */
    this.state = function(state) {
      var args = Array.prototype.slice.apply(arguments)
      var options = {
        keepOriginalNames: false,
        siblingTraversal: true
      }

      if (typeof args[1] === 'boolean') {
        options.keepOriginalNames = args[1]
      } else if (typeof args[1] === 'object') {
        angular.extend(options, args[1])
      }
      stateHelperInit(state, options)
      $stateProvider.state(state)

      if (state.children && state.children.length) {
        state.children.forEach(function(childState) {
          self.state(childState, options)
        })
      }
      return self
    }

    this.setNestedState = this.state

    self.$get = angular.noop
  })
