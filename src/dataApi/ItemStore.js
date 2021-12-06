import cloneDeep from 'lodash/cloneDeep'

/*
 * Generic item store that can be extended and used for anything.
 * loosely based on the Storage API but with errors
 * https://developer.mozilla.org/en-US/docs/Web/API/Storage
 */

const itemStoreState = function() {
  return {
    items: [],
    activeItem: {},
    errors: [] // expects objects with at least a message [{ message: 'fubar' }]
  }
}

const ItemStore = {
  state: itemStoreState(),

  setItems(items) {
    this.state.items = items
  },

  addItem(changes) {
    this.state.items.push(Object.assign({}, changes))
    return Promise.resolve()
  },

  updateItem (item, changes) {
    Object.assign(item, changes)
    return Promise.resolve()
  },

  updateAll (changes) {
    for(const item of this.state.items) {
      this.updateItem(item, changes)
    }
  },

  removeItem (item) {
    this.state.items.splice(this.state.items.indexOf(item), 1)
    return Promise.resolve()
  },

  setActiveItem (item) {
    this.state.activeItem = item
  },
  //clears the items, active and errors
  clear () {
    this.items = []
    this.activeItem = {}
    this.errors = []
  },

  updateActiveItem (changes) {
    this.updateItem(this.activeItem, changes)
  },
  //sets the activeItem and then returns a clone for editing
  editActiveItem (item) {
    let aitem = (item === false) ? {} : item
    this.setActiveItem(aitem)
    return cloneDeep(this.state.activeItem)
  },

  setErrors (errors) {
    this.state.errors = errors
  },
  //clears and then sets a single error message into the errors array
  setErrorMessage (message) {
    this.state.errors = [{message: message}]
  },
  //gets the first error message
  getErrorMessage () {
    if (this.state.errors[0] != null) {
      return this.state.errors[0].message
    }
  },

  clearErrors () {
    this.state.errors = [{message: ''}]
  }
}

export default ItemStore

