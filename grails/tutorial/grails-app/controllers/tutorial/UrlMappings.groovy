package tutorial

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(controller: "org", view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')

        "/api/orgs"(resources: "org", namespace:"api") {
            "/api/locations"(resources: "location", namespace:"api")
        }
        "/api/locations"(resources: "location", namespace:"api")
    }
}
