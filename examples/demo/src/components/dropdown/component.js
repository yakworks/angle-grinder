import template from './component.html'
import Swal from 'angle-grinder/src/tools/swal'

class controller {
  menuItems = [
    {
      display: '<strong>Main Action</strong>',
      icon: 'fa-thumbs-up',
      action: () => Swal.fire('a special event')
    },
    {
      display: 'Active action',
      icon: 'mdi-gauge',
      class: 'active',
      anyExtraInfo: 'can have any extra info needed when selected'
    },
    { divider: true },
    { display: 'Disabled link', class: 'disabled' },
    { display: 'Separated link' },
    { display: 'This will not be added', class: 'hidden' }
  ]

  menuItemClick = function(menuItem, event) {
    Swal.fire(
      `${menuItem.display} item clicked `,
      `<pre><code class="json">${JSON.stringify(menuItem, null, 2)}</code></pre>`
    )
  }
}

export default angular
  .module('ag.demo.dropdownDemo', [])
  .component('dropdownDemo', { template, controller })
  .name
