package tutorial

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?(.$format)?"{
            constraints {
                // apply constraints here
            }
        }

        "/"(view:"/index")
        "500"(view:'/error')
        "404"(view:'/notFound')

        "/orgs"(resources: "org") {
            "/locations"(resources: "location")
        }
        "/orgs/random"(controller: "org", action:"random", method: "GET")
        "/locations"(resources: "location")
    }
}
