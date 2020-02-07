import BaseCtrl from '../../utils/BaseCtrl'
import angular from 'angular'
import commonModule from '../commonModule'
import sweetAlert from 'sweetalert'

const app = angular.module(commonModule)

class NotificationDialogCtrl extends BaseCtrl {
  static initClass() {
    this.register(app, 'NotificationDialogCtrl')
    this.inject()
  }

  static register(app, name) {
    super.register(app, name)
  }

  static inject() {
    super.inject('$scope', '$log', 'options')
  }

  initialize() {
    return this.expose(this.$scope, 'options', 'close')
  }

  close() {
    return this.$log.info('Closing notification dialog')
  }
}
NotificationDialogCtrl.initClass()

class NotificationDialogServ {
  constructor($log, $q) {
    this.$log = $log
    this.$q = $q
  }

  open(options) {
    if (angular.isString(options)) { options = { message: options } }
    if (options.okLabel == null) { options.okLabel = 'Ok' }

    this.$log.info('Opening notification dialog, message:', options.message)
    const defer = this.$q.defer()

    sweetAlert({
      title: options.message,
      allowEscapeKey: false,
      confirmButtonText: options.okLabel
    }, () => defer.resolve({
      defer() { return defer }
    }))

    return defer.promise
  }
}
NotificationDialogServ.$inject = ['$log', '$q']

app.service('NotificationDialogServ', NotificationDialogServ)
