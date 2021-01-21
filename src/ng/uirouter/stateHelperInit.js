import angular from 'angular'
import stringUtils from '../../utils/stringUtils'

/**
 * Sets up defaults on the state/menu tree
 *
 * @param {Object} state - The state route menu tree
 * @param {Object} [options] - An optional options object.
 * @param {Boolean} [options.keepOriginalNames=false] An optional flag that
 *     prevents conversion of names to dot notation if true.
 * @param {Boolean} [options.siblingTraversal=false] An optional flag that
 *     adds `nextSibling` and `previousSibling` properties when enabled
 */
export default function stateHelperInit(state, opts) {
  var options = {
    keepOriginalNames: false,
    siblingTraversal: false
  }
  if (opts) {
    angular.extend(options, opts)
  }
  // by default set the url to the name
  if (!state.url && state.url !== '') {
    state.url = `/${state.name}`
  }
  // setup data for title etc if its not there
  if (!state.data) state.data = {}

  // add title in
  if (!state.data.title) {
    state.data.title = stringUtils.capitalWords(state.name)
  }
  // do breadcrumbs
  if (!state.ncyBreadcrumb) state.ncyBreadcrumb = {}
  if (!state.ncyBreadcrumb.label) {
    state.ncyBreadcrumb.label = state.data.title
  }

  if (!options.keepOriginalNames) {
    fixStateName(state)
  }

  // $stateProvider.state(state)

  if (state.children && state.children.length) {
    state.children.forEach(function(childState) {
      childState._parent = state
      stateHelperInit(childState, options)
    })

    if (options.siblingTraversal && state.sidenavItem !== false) {
      addSiblings(state)
    }
  }
  // console.log('state ', state)
  return self
}

/**
 * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
 * @param state
 */
function fixStateName(state) {
  if (!state._orgigName && state._parent) {
    state._orgigName = state.name
    state.name = (angular.isObject(state._parent) ? state._parent.name : state._parent) + '.' + state.name
  }
}

function addSiblings(state) {
  state.children.forEach(function(childState, idx, array) {
    if (array[idx + 1]) {
      childState.nextSibling = array[idx + 1].name
    }
    if (array[idx - 1]) {
      childState.previousSibling = array[idx - 1].name
    }
  })
}
