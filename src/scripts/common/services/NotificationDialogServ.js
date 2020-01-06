/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
var app = angular.module("angleGrinder.common");

class NotificationDialogCtrl extends BaseCtrl {
  static initClass() {
    this.register(app, "NotificationDialogCtrl");
    this.inject();
  }

  static register(app, name){
    super.register(app, name)
  }

  static inject(){
    super.inject("$scope", "$log", "options")
  }

  initialize() {
    return this.expose(this.$scope, "options", "close");
  }

  close() {
    return this.$log.info("Closing notification dialog");
  }
}
NotificationDialogCtrl.initClass();


class NotificationDialog {
  static initClass() {
    this.$inject = ["$log", "$q"];
  }
  constructor($log, $q) {
    this.$log = $log;
    this.$q = $q;
  }

  open(options) {
    if (angular.isString(options)) { options = { message: options }; }
    if (options.okLabel == null) { options.okLabel = "Ok"; }

    this.$log.info("Opening notification dialog, message:", options.message);
    const defer = this.$q.defer();

    swal({
      title: options.message,
      allowEscapeKey: false,
      confirmButtonText: options.okLabel
      }, () => defer.resolve({
      defer() { return defer; }
    }));

    return defer.promise;
  }
}
NotificationDialog.initClass();

app.service("NotificationDialogServ", NotificationDialog);
