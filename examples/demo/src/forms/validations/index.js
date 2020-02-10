import _ from 'lodash'

class ValidationsCtrl {
  vm = {}
  constructor(serverValidationErrorsHandler) {
    this.serverValidationErrorsHandler = serverValidationErrorsHandler
  }

  exampleOfErrorResponce = function(val) {
    return {status: 422, data:{errors: {org: {name: "Error message from server on field name, with value: " + val}}}}
  }

  save(form){
    this.serverValidationErrorsHandler(form, this.exampleOfErrorResponce(this.vm.name), "org")
  }
}

angular.module('app')
  .component('validationsExample', {
    controller: ValidationsCtrl,
    template: require('./validations.comp.html')
  })
