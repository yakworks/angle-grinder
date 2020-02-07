import _ from 'lodash'

function formatResult(item) { return item.id + ' - ' + item.name }

class FormCompCtrl {
  vm = {

  }

  select2Data = [
    { id: '1', name: 'Option A' },
    { id: '2', name: 'Option B' },
    { id: '3', name: 'Option C' }
  ]

  save(myForm) {
    if (!myForm.$valid) {
      myForm.$setSubmitted()
      return
    }
    alert('submitted')
  }

  validatePassword(e) {
    const x = e
  }
}

angular.module('app')
  .component('formInputComps', {
    controller: FormCompCtrl,
    template: require('./inputs.comp.html')
  })
