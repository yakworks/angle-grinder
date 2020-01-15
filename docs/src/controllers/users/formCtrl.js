import BaseCtrl from '../../../../src/scripts/utils/BaseCtrl'

export default class FormCtrl extends BaseCtrl {
  static initClass() {

    this.register("exampleApp", "users.FormCtrl");
    this.inject("$scope", "$location", "Select2Options", "user");
  }

  initialize() {
    this.expose(this.$scope, "user", "save", "delete");

    // options for the parent user select
    return this.$scope.userSelectOptions = this.Select2Options({
      ajax: { url: "/api/users"
    },

      // formatters for result and selection
      formatResult(user) { return `${user.name} - ${user.info.email}`; },
      formatSelection(user) { return `${user.name} - ${user.info.email}`; }
    });
  }

  // Performs server side create or update
  save(user) {
    const promise = user.save().$promise;

    promise.then(user => {
      return this.$location.path(`/examples/users/${user.id}`);
    });

    // return both promise and record in order to handle server side error
    // in `agSubmit` directive
    return [promise, user];
  }

  // Performs server side delete
  delete(user) {
    const onSuccess = function() { return this.$location.path("/examples/users"); };
    return user.delete({success: onSuccess});
  }
}
