import BaseCtrl from 'angle-grinder/src/ng/utils/BaseCtrl'

export default class EditableFormCtrl extends BaseCtrl {
  static initClass() {
    this.register("exampleApp", "users.editableFormCtrl");
    this.inject("$scope", "Select2Options");
  }

  initialize() {
    this.expose(this.$scope, "hasNotification", "update");

    // create the master copy
    this.$scope.master = this.$scope.user;
    this.$scope.user = angular.copy(this.$scope.master);

    if (this.$scope.user.roles == null) { this.$scope.user.roles = ["user", "moderator"]; }

    // options for the parent user select
    this.$scope.parentSelectOptions = this.Select2Options({
      ajax: { url: "/api/users"
    },

      // formatters for result and selection
      formatResult(user) { return `${user.name} - ${user.info.email}`; },
      formatSelection(user) { return `${user.name} - ${user.info.email}`; }
    });

    this.$scope.roles = [
      { id: "admin", name: "admin" },
      { id: "user", name: "user" },
      { id: "guest", name: "guest" },
      { id: "moderator", name: "moderator" }
    ];

    if (this.$scope.user.notificationType == null) { this.$scope.user.notificationType = ""; }

    return this.$scope.notificationTypes = [
      { id: "", text: "None" },
      { id: "email", text: "Email" },
      { id: "fax", text: "Fax" },
      { id: "paper", text: "Paper" }
    ];
  }

  hasNotification(form, user, type) {
    if (form.$visible) {
      return form.notificationType.$modelValue === type;
    } else {
      return user.notificationType === type;
    }
  }

  update(user, form) {
    const promise = user.$update();

    // update the master copy
    promise.then(user => {
      return angular.copy(user, this.$scope.master);
    });

    // handle server side errors
    promise.catch(function(response) {
      if ((response.status === 422) && angular.isObject(response.data.errors != null ? response.data.errors.user : undefined)) {
        return (() => {
          const result = [];
          for (let field in response.data.errors.user) {
            const message = response.data.errors.user[field];
            result.push(form.$setError(field, message));
          }
          return result;
        })();
      }
    });

    return promise;
  }
}
EditableFormCtrl.initClass()
