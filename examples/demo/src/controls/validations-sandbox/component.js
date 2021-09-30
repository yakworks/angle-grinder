import template from './component.html'
import Swal from 'angle-grinder/src/tools/swal'
import ky from 'ky'

class controller {
  menuDisplay = 'Choose an action'

  menuItems = [
    { display: '<strong>Action</strong>', action: () => Swal.fire('something special') },
    { display: 'Another action' },
    { divider: true },
    { display: 'Separated link' }
  ]

  vm = {}

  /* @ngInject */
  constructor($scope) {
    this.$scope = $scope
  }

  menuItemClick = function(menuItem, e) {
    console.log('menuItemClick', { menuItem, e })
  }

  async serverValidate(agForm) {
    console.log('this.$scope', this.$scope)
    try {
      const savedItem = await ky.post('http://localhost:3000/validation/mock', { json: this.vm }).json()
    } catch (er) {
      await agForm.setServerErrors(er.response)
      console.log('form has validation errors', er.response)
    }
  }
}

export default angular.module('demo.validationsExample', [])
  .component('validationDemo', { controller, template })
  .name
