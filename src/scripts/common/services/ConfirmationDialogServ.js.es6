/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
const app = angular.module("angleGrinder.common");

app.service("ConfirmationDialogServ", [
  "$log", "$q", ($log, $q) => // Open the confirmation dialog
// options - it can be a string or object with the messages
//   if th message is not specified default "Are you sure?" message will be used
({
  open(options) {
    if (options == null) { options = {}; }
    if (angular.isString(options)) { options = { message: options }; }

    // assign default confirmation message
    if (options.message == null) { options.message = "Are you sure?"; }

    // assign button labels
    if (options.cancelLabel == null) { options.cancelLabel = "Cancel"; }
    if (options.okLabel == null) { options.okLabel = "Ok"; }
    if (options.closeOnConfirm == null) { options.closeOnConfirm = true; }

    $log.info("[ag] opening confirmation dialog", options);

    const defer = $q.defer();

    swal({
        title: options.message,
        allowEscapeKey: false,
        showCancelButton: true,
        confirmButtonText: options.okLabel,
        cancelButtonText: options.cancelLabel,
        closeOnConfirm: options.closeOnConfirm
      }, isConfirmed => defer.resolve(isConfirmed));

    return defer.promise;
  }
})
]);
