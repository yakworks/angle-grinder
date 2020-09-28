// import Log from '../../../utils/Log'
import _ from 'lodash'

export default () => ({
  restrict: 'E',
  require: {
    gridCtrl: '^gridz'
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
      massUpdate: { icon: 'far fa-edit', tooltip: 'Mass Update' },
      xlsExport: { icon: 'far fa-file-excel', tooltip: 'Export to Excel' }
      // massUpdate: { icon: 'far fa-edit', tooltip: 'Mass Update' },
      // xlsExport: { icon: 'far fa-file-excel', tooltip: 'Export to Excel' }
    },
    leftButtons: {
      create: { icon: 'far fa-plus-square', tooltip: 'Create New' }
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
    if (this.options) {
      _.merge(this.opts, this.options)
    }
  }

  $postLink() {
    const rightSec = this.options.rightSection
    if (rightSec) {
      const rightHtml = this.$element.find('.right-html')
      const tpl = rightSec.template
      rightHtml.append(Array.isArray(tpl) ? tpl.join('\n') : tpl)
      const scope = this.options.scope ? this.options.scope() : this.$scope
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
        this.gridCtrl.quickSearch(this.qSearchEntry)
      }
      // esc key
      if (event.which === 27) {
        this.qSearchEntry = ''
        // scope.$apply()
      }
    })
  }

  clearSearchInput() {
    this.qSearchEntry = ''
    this.gridCtrl.quickSearch('')
  }

  fireButtonClick(key, btnItem, event) {
    btnItem.key = key
    // if it has an action then fire that
    if (_.isFunction(btnItem.action)) {
      btnItem.action(btnItem, event)
    } else {
      this.gridCtrl.listCtrl.fireToolbarAction(btnItem, event)
    }
  }
}
