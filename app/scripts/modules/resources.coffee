resources = angular.module("angleGrinder.resources", ["ngResource"])

resources.factory "Users", [
  "$resource", ($resource) ->
    Users = $resource "/api/users/:id", { id: "@id" },
      get: { method: "GET" },
      save: { method: "POST" },
      update: { method: "PUT" },
      delete: { method: "DELETE" }

    # Backbone-style save() that inserts or updated the record
    # based on the presence of an id.
    angular.extend Users.prototype,
      save: (onComplete = ->) ->
        if @id?
          @$update(onComplete)
        else
          @$save(onComplete)

    Users
]
