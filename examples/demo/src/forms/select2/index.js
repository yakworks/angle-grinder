import _ from 'lodash'
import idxtemplate from './index.html';

function formatResult(item) { return item.id + ' - ' + item.name }

class Select2Ctrl {
  normalSelectOptions = [
    { id: 1, name: 'Option 1' },
    { id: 2, name: 'Option 2' },
    { id: 3, name: 'Option 3' }
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
      results: this.normalSelectOptions,
      text: 'name'
    }
    // useDataObject: true
    // formatSelection: formatResult,
    // formatResult: formatResult
  }

  selInputMultiOpts = {
    closeOnSelect: false,
    data: {
      results: this.normalSelectOptions,
      text: 'name'
    }
    // formatSelection: formatResult,
    // formatResult: formatResult
  }

  useDataObjectOpts = {
    useDataObject: true,
    allowClear: true,
    data: {
      results: this.normalSelectOptions,
      text: 'name'
    }
  }

  constructor() {
  }
}

class Select2DataCtrl extends Select2Ctrl {
  vm = {
    selInputMulti: [
      { id: 1, name: 'Option 1' }
    ],
    selInput:{ id: 2 },
    useDataObject: {
      id: 3,
      name: "Option 3"
    },
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

// angular.module('app')
//   .component('select2Comps', {
//     controller: Select2Ctrl,
//     template: require('./select2.comp.html')
//   })
//   .component('select2CompsData', {
//     controller: Select2DataCtrl,
//     template: require('./select2.comp.html')
//   })

export default angular
.module('ag.demo.select2-all', [])
.component('select2Comps', {
  controller: Select2Ctrl,
  template: require('./select2.comp.html')
})
.component('select2CompsData', {
  controller: Select2DataCtrl,
  template: require('./select2.comp.html')
})
.component('select2DemoIndex', { template: idxtemplate })
.name
