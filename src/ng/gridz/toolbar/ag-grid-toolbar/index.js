// import Log from '../../../utils/Log'
import _ from 'lodash'

export default () => ({
  restrict: 'E',
  require: {
    gridCtrl: '^agGridz'
  },
  template: require('./toolbar.html'),
  bindToController: true,
  scope: {
    options: '<'
  },
  controller: Controller,
  controllerAs: 'tbCtrl'
})

class Controller {
  opts = {
    selectedButtons: {
      massUpdate: { icon: 'fa-edit', tooltip: 'Mass Update', action: () => this.gridCtrl.actionCtrl.showMassUpdate() },
      export: { icon: 'fa-table', tooltip: 'Export to Excel', action: () => this.gridCtrl.xlsExport() }
    },
    leftButtons: {
      createNew: { icon: 'fa-plus', tooltip: 'Create New', action: () => this.gridCtrl.actionCtrl.createRecord() }
    },
    showQuickSearch: true,
    showSearchFormButton: true
  }

  constructor($element, $compile, $scope) {
    this.$element = $element
    this.$compile = $compile
    this.$scope = $scope
  }

  $onInit() {
    console.log('this.$scope', this.$scope)
    //
    // console.log('this.gridCtrl', this.gridCtrl)
    // this.actionCtrl = this.gridCtrl.actionCtrl
    // console.log("this.gridCtrl", this.gridCtrl)
    console.log('this.options', this.options)
    if (this.options) {
      _.merge(this.opts, this.options)
      console.log('this.opts', this.opts)
    }
  }

  $postLink() {
    const rightSec = this.options.rightSection
    if (rightSec) {
      const rightHtml = this.$element.find('.right-html')
      rightHtml.append(rightSec.template)
      const scope = rightSec.scope ? rightSec.scope() : this.$scope
      this.$compile(rightHtml)(scope)
    }
    this.setupSearchInput()
  }

  setupSearchInput() {
    this.$element.find('.quick-search').bind('keydown', event => {
      // console.log("keydown event", event)
      // 13 - Enter key code
      if (event.which === 13) {
        event.preventDefault()
        this.gridCtrl.quickSearch(this.quickSearchEntry)
        // this.quickSearchEntry = ""
      }
      // esc key
      if (event.which === 27) {
        this.quickSearchEntry = ''
        // scope.$apply()
      }
    })
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
