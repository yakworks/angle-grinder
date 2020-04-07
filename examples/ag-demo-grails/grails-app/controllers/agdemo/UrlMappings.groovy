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
            put "/$controller/$id(.$format)?" { action = "update" }
            patch "/$controller/$id(.$format)?" { action = "update" }
            get "/$controller/$action/"()
            get "/$controller/$action/$id"()
        }
    }
}
