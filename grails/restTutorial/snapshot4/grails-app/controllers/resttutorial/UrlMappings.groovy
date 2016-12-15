package resttutorial

class UrlMappings {

    static mappings = {
      group("/api") {
        delete "/$controller/$id(.$format)?"(action: "delete")
        get "/$controller(.$format)?"(action: "index")
        get "/$controller/$id(.$format)?"(action: "show")
        post "/$controller(.$format)?"(action: "save")
        put "/$controller/$id(.$format)?"(action: "update")
        patch "/$controller/$id(.$format)?"(action: "patch")
      }

        "500"(view: '/error')
        "404"(view: '/notFound')

      "/api/contact"(resources: "contact", namespace: "api"){
        delete "/active"(controller: "contact", action: "inactivate")
      }
    }
}
