import * as nameUtils from '@yakit/core/nameUtils'
import { merge } from '@yakit/core/dash'
import { isPlainObject } from '@yakit/core/is'

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
    merge(options, opts)
  }
  // by default set the url to the name
  if (!state.url && state.url !== '') {
    state.url = `/${state.name}`
  }
  state.href =  `/#${state.url}`
  // setup data for title etc if its not there
  if (!state.data) state.data = {}

  // add title in
  if (!state.data.title) {
    state.data.title = nameUtils.naturalName(state.name)
  }
  // do breadcrumbs
  if (!state.ncyBreadcrumb) state.ncyBreadcrumb = {}
  if (!state.ncyBreadcrumb.label) {
    state.ncyBreadcrumb.label = state.data.title
  }

  fixStateName(state)
  if(state._parent) state.href = `${state._parent.href}${state.url}`
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
  return self
}

/**
 * Converts the name of a state to dot notation, of the form `grandfather.father.state`.
 * @param state
 */
function fixStateName(state) {
  if (!state._orgigName && state._parent) {
    state._orgigName = state.name
    state.name = (isPlainObject(state._parent) ? state._parent.name : state._parent) + '.' + state.name
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
