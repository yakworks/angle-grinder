// import Log from '../../../utils/Log'
import _ from 'lodash'

class Controller {
  selectedButtons = [
    { icon: 'fa-edit', tooltip: 'Mass Update', action: () => this.gridCtrl.actionCtrl.showMassUpdate() },
    { icon: 'fa-table', tooltip: 'Export to Excel', action: () => this.gridCtrl.xlsExport() }
  ]

  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    console.log('this.gridCtrl', this.gridCtrl)
    this.actionCtrl = this.gridCtrl.actionCtrl
    // console.log("this.gridCtrl", this.gridCtrl)
  }

  fireButtonClick(btnItem, event) {
    // if it has an action then fire that
    if (_.isFunction(btnItem.action)) {
      btnItem.action(btnItem, event)
    } else if (_.isFunction(this.buttonClick)) { // if there is a default then use it
      this.buttonClick(btnItem, event)
    }
  }
}

export default () => ({
  restrict: 'E',
  // replace: true,
  require: {
    gridCtrl: '^agGridz'
  },
  // transclude: true,
  template: require('./toolbar.html'),
  bindToController: true,
  controller: Controller,
  controllerAs: 'tbCtrl'
})
