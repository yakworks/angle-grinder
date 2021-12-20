// import Log from '../../../utils/Log'
import _ from 'lodash'

export default () => ({
  restrict: 'E',
  template: require('./toolbar.html'),
  bindToController: true,
  scope: {
    options: '<',
    gridCtrl: '<'
  },
  controller: Controller,
  controllerAs: 'tbCtrl'
})

class Controller {
  opts = {
    selectedButtons: {
      xlsExport: { icon: 'far fa-file-excel', tooltip: 'Export to Excel' }
    },
    leftButtons: {
      create: { icon: 'far fa-plus-square', tooltip: 'Create New' }
    },
    searchFormButton: { icon: 'mdi-text-box-search-outline', tooltip: 'Show Search Filters Form' },
    showQuickSearch: true
  }
  isLoading = false
  //injected
  gridCtrl

  /* @ngInject */
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
    const rightSec = this.options?.rightSection
    if (rightSec) {
      const rightHtml = this.$element.find('.right-html')
      const tpl = rightSec.template
      rightHtml.append(Array.isArray(tpl) ? tpl.join('\n') : tpl)
      const scope = this.options.scope ? this.options.scope() : this.$scope
      this.$compile(rightHtml)(scope)
    }
    this.setupSearchInput()
  }

  toggleSearchForm() {
    // console.log("toggleSearchForm ", this.gridCtrl.state)
    this.gridCtrl.state.showSearchForm = !this.gridCtrl.state.showSearchForm
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

  async fireButtonClick(key, btnItem, event) {
    btnItem.key = key
    // if it has an action then fire that
    try {
      this.isLoading = true
      this.gridCtrl.toggleLoading(true)
      if (_.isFunction(btnItem.action)) {
        await btnItem.action(btnItem, event)
      } else {
        console.log(this.gridCtrl)
        await this.gridCtrl.gridOptions.fireToolbarAction(btnItem, event)
      }
    } finally {
      this.isLoading = false
      this.gridCtrl.toggleLoading(false)
    }
  }
}
