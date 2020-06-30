// import Log from '../../../utils/Log'
import _ from 'lodash'

class Controller {
  selectedButtons = {
    massUpdate: { icon: 'fa-edit', tooltip: 'Mass Update', action: () => this.gridCtrl.actionCtrl.showMassUpdate() },
    export: { icon: 'fa-table', tooltip: 'Export to Excel', action: () => this.gridCtrl.xlsExport() }
  }

  leftButtons = {
    createNew: { icon: 'fa-plus', tooltip: 'Create New', action: () => this.gridCtrl.actionCtrl.createRecord() }
  }

  constructor($element) {
    this.$element = $element
  }

  $onInit() {
    // console.log('this.gridCtrl', this.gridCtrl)
    // this.actionCtrl = this.gridCtrl.actionCtrl
    // console.log("this.gridCtrl", this.gridCtrl)
    console.log('this.options', this.options)
    if (this.options) {
      const opts = this.options
      if (opts.selectedButtons) {
        _.merge(this.selectedButtons, opts.selectedButtons)
        console.log('this.selectedButtons', this.selectedButtons)
      }
      if (opts.leftButtons) {
        _.merge(this.leftButtons, opts.leftButtons)
        console.log('this.leftButtons', this.leftButtons)
      }
    }
  }

  fireButtonClick(key, btnItem, event) {
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
  bindToController: {
    options: '<'
  },
  controller: Controller,
  controllerAs: 'tbCtrl'
})
