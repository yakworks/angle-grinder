package agdemo

class UrlMappings {
    static mappings = {

        "/$controller/$action?/$id?" {
            constraints {
                // apply constraints here
            }
        }

        '/org'(controller: 'orgTabs', action: 'index')
        '/demo'(uri: "index.html")
        "500"(view: "/error")
        '/api/orgApi/gridOptions'(controller: 'orgApi', action: 'gridOptions')
        group("/api") {
            delete "/$controller/$id(.$format)?" { action = "delete" }
            get "/$controller(.$format)?" { action = "index" }
            get "/$controller/$id(.$format)?" {
                action = "get"
                constraints {
                    id(validator: {
                        return it.isLong()
                    })
                }
            }
            post "/$controller(.$format)?" { action = "save" }
            post "/$controller/$action?"()
            put "/$controller/$id" { action = "update" }
            patch "/$controller/$id" { action = "update" }
            get "/$controller/$action/"{action = "gridOptions"}
            get "/$controller/$action/$id"()
        }
    }
}
