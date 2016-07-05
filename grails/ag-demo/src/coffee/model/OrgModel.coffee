app = angular.module("angleGrinder")

app.factory 'OrgModel', ["$modelFactory", "pathWithContext", ($modelFactory, pathWithContext)->
  $modelFactory(pathWithContext('org'),
    actions:
      list: { method: "GET",  url: "list", isArray: false }
      get:
        method: "GET"
        url: "get"
      save:     { method: "POST",  url: "save" }
      update:     { method: "POST",  url: "update"  }
      "delete":   { method: "POST",  url: "delete"  }
      massUpdate: { method: "POST",  url: "massUpdate" , wrap: false  }
      massDelete: { method: "POST",  url: "massDelete" , wrap: false  }
      post:     { method: "POST",  url: "save" }
    ,
    base:{
    }
    instance: {
      $persisted: ->
        @.id?

    }
  )
]