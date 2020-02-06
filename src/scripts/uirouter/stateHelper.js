import angular from 'angular'
import ui_router from 'angular-ui-router'
import 'angular-breadcrumb' //'ncy-angular-breadcrumb'
import stringUtils from '../utils/stringUtils'
// from https://github.com/marklagendijk/ui-router.stateHelper

const MOD_NAME = 'ui.router.stateHelper'
export default MOD_NAME

angular.module(MOD_NAME, [
  ui_router,
  'ncy-angular-breadcrumb',
])
.provider('stateHelper', function ($stateProvider) {
  var self = this;

  /**
   * Recursively sets the states using $stateProvider.state.
   * Child states are defined via a `children` property.
   *
   * 1. Recursively calls itself for all descendant states, by traversing the `children` properties.
   * 2. Converts all the state names to dot notation, of the form `grandfather.father.state`.
   * 3. Sets `parent` property of the descendant states.
   *
   * @param {Object} state - A regular ui.router state object.
   * @param {Array} [state.children] - An optional array of child states.
   * @param {Object} [options] - An optional options object.
   * @param {Boolean} [options.keepOriginalNames=false] An optional flag that
   *     prevents conversion of names to dot notation if true.
   * @param {Boolean} [options.siblingTraversal=false] An optional flag that
   *     adds `nextSibling` and `previousSibling` properties when enabled
   */
  this.state = function (state) {
    var args = Array.prototype.slice.apply(arguments);
    var options = {
      keepOriginalNames: false,
      siblingTraversal: false
    };

    if (typeof args[1] === 'boolean') {
      options.keepOriginalNames = args[1];
    }
    else if (typeof args[1] === 'object') {
      angular.extend(options, args[1]);
    }
    // by default set the url to the name
    if(!state.url){
      state.url = `/${state.name}`
    }
    // setup data for title etc if its not there
    if(!state.data) state.data = {}

    // add title in
    if(!state.data.title){
      state.data.title = stringUtils.capitalWords(state.name)
    }
    // do breadcrumbs
    if(!state.ncyBreadcrumb) state.ncyBreadcrumb = {}
    if(!state.ncyBreadcrumb.label){
      state.ncyBreadcrumb.label = state.data.title
    }

    if (!options.keepOriginalNames) {
      fixStateName(state);
    }

    $stateProvider.state(state);

    if (state.children && state.children.length) {
      state.children.forEach(function (childState) {
        childState._parent = state;
        self.state(childState, options);
      });

      if (options.siblingTraversal) {
        addSiblings(state);
      }
    }
    console.log("state ", state)
    return self;
  };

  this.setNestedState = this.state;

  self.$get = angular.noop;

  /**
   * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
   * @param state
   */
  function fixStateName(state) {
    if (state._parent) {
      state._orgigName = state.name
      state.name = (angular.isObject(state._parent) ? state._parent.name : state._parent) + '.' + state.name;
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function addSiblings(state) {
    state.children.forEach(function (childState, idx, array) {
      if (array[idx + 1]) {
        childState.nextSibling = array[idx + 1].name;
      }
      if (array[idx - 1]) {
        childState.previousSibling = array[idx - 1].name;
      }
    });
  }
})
