import template from './batchListTpl.html'
import listCtrl from './batchListCtrl'

export default {
  bindings: {
    apiKey: '<',
    notification: '<',
    formatters: '<'
  },
  template: template,
  controller: listCtrl
}
