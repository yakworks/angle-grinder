package demo.gorm.rest.api

class UrlMappings {

    static mappings = {
        "/"(controller: 'application', action:'index')
        "500"(view: '/error')
        "404"(view: '/notFound')
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
            get "/$controller/$action/"()
            get "/$controller/$action/$id"()
        }

    }
}
