import template from './component.html'
import Swal from 'angle-grinder/src/tools/swal'

class controller {
  menuItems = [
    {
      display: 'Refresh',
      icon: 'fa-refresh',
      action: () => Swal.fire('a special event')
    },
    {
      display: 'Reset Sort', icon: 'fa-sort'
    },
    {
      display: 'Column Config', icon: 'fa-exchange'
    },
    { divider: true },
    { display: 'Hide/Show Toggle', icon: 'fa-minus' },
    { display: 'Expand', icon: 'fa-expand' }
  ]

  menuItemClick = function(menuItem, event) {
    // console.log('menuItemClick params', { menuItem, event })
    Swal.fire(
      `${menuItem.display} item clicked `,
      `<pre><code class="json">${JSON.stringify(menuItem, null, 2)}</code></pre>`
    )
  }
}

export default angular
  .module('ag.demo.toolbarCompDemo', [])
  .component('toolbarCompDemo', { template, controller })
  .name
