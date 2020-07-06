// import Log from '../../../utils/Log'
// import _ from 'lodash'

class Controller {
  defaultMenuItems = [
    {
      display: 'Refresh', icon: 'fa-refresh', action: () => this.gridCtrl.reloadKeepSelected()
    },
    { display: 'Reset Sort', icon: 'fa-sort', action: () => this.gridCtrl.resetSort() },
    { divider: true },
    { display: 'Column Config', icon: 'fa-columns', action: () => this.ColumnConfigServ.open(this.gridCtrl) },
    { display: 'Density Toggle', icon: 'fa-compress', action: () => this.gridCtrl.isDense = !this.gridCtrl.isDense },
    { divider: true },
    { display: 'Hide/Show Toggle', icon: 'fa-minus' },
    { display: 'Expand', icon: 'fa-expand' }
  ]

  constructor($element, ColumnConfigServ) {
    this.$element = $element
    this.ColumnConfigServ = ColumnConfigServ
  }

  $onInit() {
    // if (this.menuItems) _.merge(this.defaultMenuItems, this.menuItems)
  }
}

export default () => ({
  restrict: 'E',
  // replace: true,
  controllerAs: 'optsCtrl',
  require: {
    gridCtrl: '^gridz'
  },
  bindToController: {
    menuItems: '<',
    menuClick: '='
  },
  template: require('./dropdown.html'),
  controller: Controller
})
