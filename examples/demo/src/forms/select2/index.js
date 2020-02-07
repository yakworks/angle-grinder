import _ from 'lodash'

function formatResult(item) { return item.id + ' - ' + item.name }

class Select2Ctrl {
  normalSelectOptions = [
    { id: 1, text: 'Option 1' },
    { id: 2, text: 'Option 2' },
    { id: 3, text: 'Option 3' }
  ]

  selInputOpts = {
    // isSelect: true,
    allowClear: true,
    placeholder: 'select a foo',
    // data: {
    //   results: this.normalSelectOptions,
    //   text: 'name'
    // },
    data: {
      results: this.normalSelectOptions
    }
    // useDataObject: true
    // formatSelection: formatResult,
    // formatResult: formatResult
  }

  selInputMultiOpts = {
    closeOnSelect: false,
    data: {
      results: this.normalSelectOptions
      // text: 'name'
    }
    // formatSelection: formatResult,
    // formatResult: formatResult
  }

  constructor() {
  }
}

class Select2DataCtrl extends Select2Ctrl {
  vm = {
    selInputMulti: [
      { id: '1', text: 'Option 1' }
    ],
    selInput: '1',
    selSelectMutiple: [
      'bar2'
    ],
    selSelectNoOpts: 'bar2',
    selSelect: 'bar2'
  }

  addMulti() {
    this.vm.selInputMulti.push({ id: 2, text: 'Option 2' })
    this.vm.selSelectMutiple.push('foo1')
  }
}

angular.module('app')
  .component('select2Comps', {
    controller: Select2Ctrl,
    template: require('./select2.comp.html')
  })
  .component('select2CompsData', {
    controller: Select2DataCtrl,
    template: require('./select2.comp.html')
  })
