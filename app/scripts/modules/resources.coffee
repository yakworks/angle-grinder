resources = angular.module("angleGrinder.resources", ["ngResource"])

resources.factory "Users", [
  "$resource", ($resource) ->
    Users = $resource "/api/users/:id", { id: "@id" },
      get: { method: "GET" },
      save: { method: "POST" },
      update: { method: "PUT" },
      delete: { method: "DELETE" }

    angular.extend Users.prototype,
      # Retunrs true if the record is persisted (has an id)
      persisted: -> @id?

      # Backbone style save() that inserts or updated the record
      # based on the presence of an id.
      save: (onComplete = ->) ->
        if @persisted()
          @$update(onComplete)
        else
          @$save(onComplete)

      delete: (onComplete = ->) ->
        @$delete(onComplete)

    Users
]
