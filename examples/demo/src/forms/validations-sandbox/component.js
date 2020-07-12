import template from './component.html'
import Swal from 'angle-grinder/src/tools/swal'

class controller {
  menuDisplay = 'Choose an action'

  menuItems = [
    { display: '<strong>Action</strong>', action: () => Swal.fire('something special') },
    { display: 'Another action' },
    { divider: true },
    { display: 'Separated link' }
  ]

  vm = {}

  constructor(serverErrorsService, $http, $timeout) {
    this.serverErrorsService = serverErrorsService
    this.$http = $http
    this.$timeout = $timeout
  }

  menuItemClick = function(menuItem, e) {
    console.log('menuItemClick', { menuItem, e })
  }

  save(form) {
    this.$http.post('http://localhost:3000/validation/mock', this.vm).then(resp => {
      console.log('all saved', resp)
    }, errorResp => {
      this.serverErrorsService.setErrors(form, errorResp)
      console.log('form has validation errors', errorResp)
    })
  }
}

export default angular.module('demo.validationsExample', [])
  .component('validationDemo', { controller, template })
  .name
