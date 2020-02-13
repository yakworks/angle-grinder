import template from './dropdown-demo.html';
import Swal from 'sweetalert2'

class controller {
  menuItems = [
    {
      display: '<strong>Main Action</strong>',
      action: () => Swal.fire('a special event')
    },
    { display: 'Active action', class: 'active',
      anyExtraInfo: 'can have any extra info needed when selected'
    },
    { divider: true},
    { display: 'Disabled link', class: 'disabled'},
    { display: 'Separated link'},
    { display: 'This will not be added', class: 'hidden'}
  ]

  menuItemClick = function(menuItem, event){
    console.log('menuItemClick params', { menuItem, event})
    Swal.fire(
      `${menuItem.display} item clicked `,
      `<pre><code class="json">${JSON.stringify(menuItem, null, 2)}</code></pre>`
    )
  }
}

export default angular
  .module('module.demo.dropdownDemo', [])
  .component('dropdownDemo', { template, controller })
  .name;
