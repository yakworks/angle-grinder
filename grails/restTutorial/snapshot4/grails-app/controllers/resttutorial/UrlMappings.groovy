package resttutorial

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?" {
            constraints {
                // apply constraints here
            }
        }
        "/" (controller: "contact", action: "index")

        "500"(view: '/error')
        "404"(view: '/notFound')

      "/api/contacts"(resources: "contact", namespace: "api"){
        "/inactivate"(controller: "contact", action: "inactivate")
      }
    }
}
