import angular from 'angular'

const res = angular.module("userResourcesMockupMod", [
  "ngResource",
  "ngRoute"
]);
export default "userResourcesMockupMod"

res.factory("Users", [
  "$resource", function($resource) {
    const Users = $resource("/api/users/:id/:action", { id: "@id" }, {
      get:        { method: "GET" },
      massUpdate: { method: "PUT", params: {action: "massUpdate"} },
      save:       { method: "POST" },
      update:     { method: "PUT" },
      delete:     { method: "DELETE" }
    });

    // The action methods on the class object or instance object can be invoked with the following parameters:
    // * HTTP GET "class" actions: Resource.action([parameters], [success], [error])
    // * non-GET "class" actions: Resource.action([parameters], postData, [success], [error])
    // * non-GET instance actions: instance.$action([parameters], [success], [error])
    angular.extend(Users.prototype, {
      // Returns the name of the resource
      resourceName() { return "user"; },

      // Returns true if the record is persisted (has an id)
      persisted() { return (this.id != null); },

      // Returns true if the record is not persisted
      newRecord() { return !this.persisted(); },

      // Backbone style save() that inserts or updated the record
      // based on the presence of an id.
      save(options) {
        if (options == null) { options = {}; }
        const method = !this.persisted() ? "save" : "update";
        return Users[method]({}, this, options.success, options.error);
      },

      delete(options) {
        if (options == null) { options = {}; }
        return Users.delete({}, this, options.success, options.error);
      }
    }
    );

    return Users;
  }
]);

// Tries to load an user record with the given id taken from route params
res.factory("userResolver", [
  "$q", "$route", "Users", ($q, $route, Users) => (function(id) {
  const deferred = $q.defer();

  const onSuccess = user => deferred.resolve(user);
  const onError = () => deferred.reject();
  Users.get({id}, onSuccess, onError);

  return deferred.promise;
})
]);
