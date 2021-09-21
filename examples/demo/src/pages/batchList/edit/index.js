import template from './editTpl.html'
import ctrl from './editCtrl'

export default {
  bindings: {
    apiKey: '<',
    notification: '<',
    arBatch: '<'
  },
  template: template,
  controller: ctrl
}
