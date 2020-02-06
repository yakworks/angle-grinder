import _ from 'lodash'

console.log("***WTF")

function formatResult(item) { return item.id + " - " + item.name; }

class FormCtrl {
  normalSelectOptions = [
    {id: 1, name: 'Option A'},
    {id: 2, name: 'Option B'},
    {id: 3, name: 'Option C'}
  ]
  uiSelect2Opts = {
    isSelect: true,
    allowClear: true,
    placeholder: 'select a foo',
    data: {
      results: this.normalSelectOptions,
      text: 'name'
    },
    //formatSelection: formatResult,
    //formatResult: formatResult
  }

  vm = {
    sel2Input: 1,
    sel2: {
      id: 1
    },
    selectMutiple: [ 0, 1]
  }

  constructor (){
    //vm = this
    // let model = {
    //   name: 'jim',
    //   switch: true
    // }
    // _.merge(this,model)
  }
}

angular.module('app')
  // .component('formHorizontalBoot', {
  //   controller: FormCtrl,
  //   controllerAs: 'vm',
  //   template: require('./form-horizontal-boot.comp.html')
  // })
  .component('formHorizontalFixed', {
    controller: FormCtrl,
    template: require('./horizontal-fixed.comp.html')
  })
