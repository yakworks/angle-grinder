import _ from 'lodash'

function formatResult(item) { return item.id + ' - ' + item.name }

class SelectsCtrl {
  selectData = [
    { id: 1, name: 'Option A' },
    { id: 2, name: 'Option B' },
    { id: 3, name: 'Option C' }
  ]

  uiSelect2Opts = {
    isSelect: true,
    placeholder: 'select a foo',
    data: {
      results: this.selectData,
      text: 'name'
    }
    // formatSelection: formatResult,
    // formatResult: formatResult
  }

  uiSelect2MultiOpts = {
    data: {
      results: this.selectData,
      text: 'name'
    }
    // formatSelection: formatResult,
    // formatResult: formatResult
  }

  vm = {
    sel2Input: 1,
    sel2: {
      id: 1
    },
    selectMutiple: [0, 1],
    sel2MultiInput: [{ id: '1', name: 'Option A' }]
  }
}

export default angular.module('demo.horizonal-sandbox', [])
  // .component('formHorizontalBoot', {
  //   controller: FormCtrl,
  //   controllerAs: 'vm',
  //   template: require('./form-horizontal-boot.comp.html')
  // })
  .component('basicInputsExample', {
    // controller: FormCtrl,
    template: require('./basic-inputs.comp.html')
  })
  .component('basicSelectsExample', {
    controller: SelectsCtrl,
    template: require('./basic-selects.comp.html')
  })
  .component('basicChecksExample', {
    // controller: FormCtrl,
    template: require('./basic-checks.comp.html')
  })
  .name
