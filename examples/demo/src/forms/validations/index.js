import _ from 'lodash'

class ValidationsCtrl {
  vm = {}
  constructor(serverErrorsService) {
    this.serverErrorsService = serverErrorsService
  }

  mockServerValidation(model) {
    if(model.name === 'bill'){
      return {
        status: 422,
        data:{
          errors: {
            org: {
              name: "no more bills in Org"
            },
            name: "no more bills"
          }
        }
      }
    }
    // for child fields
    // return {status: 422, data:{errors: {org: {name: "An Error message from server on field name, with value: " + val}}}}
  }

  save(form){
    let errors = this.mockServerValidation(this.vm)
    if(errors){
      // pass in org resource to use drill into errors
      // this.serverErrorsService.setErrors(form, errors, "org")
      this.serverErrorsService.setErrors(form, errors)
    }
  }
}

angular.module('app')
  .component('validationsExample', {
    controller: ValidationsCtrl,
    template: require('./validations.comp.html')
  })
