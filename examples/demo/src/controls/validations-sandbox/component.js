import template from './component.html'
import Swal from '@yakit/ui/swal'
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
    try {
      const savedItem = await ky.post('http://localhost:3000/validation/mock', { json: this.vm }).json()
    } catch (er) {
      await agForm.setServerErrors(er.response)
    }
  }
}

export default angular.module('demo.validationsExample', [])
  .component('validationDemo', { controller, template })
  .name
