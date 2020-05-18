import template from './comp.html'

class controller {
  org = {
    phone: '888-555-1212',
    city: 'Chicago'
  }

  roles = [
    { id: 'admin', name: 'admin' },
    { id: 'user', name: 'user' },
    { id: 'guest', name: 'guest' },
    { id: 'moderator', name: 'moderator' }
  ]

  selectData = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
  ]

  selectInputOpts = {
    // isSelect: true,
    allowClear: true,
    placeholder: 'Select a foo',
    data: {
      results: this.selectData,
      text: 'name'
    }
  }

  selInputMultiOpts = {
    closeOnSelect: false,
    data: {
      results: this.selectData,
      text: 'name'
    }
  }
}

export default angular
  .module('ag.demo.xedit1Demo', [])
  .component('xedit1Demo', {
    template,
    controller
  })
  .name
