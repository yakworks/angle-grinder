package agdemo

class UrlMappings {
    static mappings = {

        "/$controller/$action?/$id?" {
            constraints {
                // apply constraints here
            }
        }

        '/org'(controller: 'orgTabs', action:'index')
        '/demo'(uri:"index.html")
        "500"(view: "/error")
    }
}
