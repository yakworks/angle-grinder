services = angular.module("angleGrinder.services")

services.factory "Users", [
  "$resource", ($resource) ->
    $resource "/api/users/:id.json", { id: "@id" },
      get: { method: "GET" },
      save: { method: "POST" },
      update: { method: "PUT" },
      delete: { method: "DELETE" }
]
