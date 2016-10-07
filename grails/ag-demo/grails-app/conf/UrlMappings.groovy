import grinder.OrgController

class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?" {
			constraints {
				// apply constraints here
			}
		}

		"/"(controller: "OrgTabs", action: "index")
		"500"(view: "/error")
    "/$namespace/$controller/$action?"()

    "/api/orgs"(resources: "org", namespace:"api"){
      "/notes"(resources: "note", namespace:"api")
      "/users"(resources: "user", namespace:"api")
    }

    "/api/users"(resources: "user", namespace:"api")
    "/api/notes"(resources: "note", namespace:"api")
    "/api/contacts"(resources: "contact", namespace:"api")
    "/api/orgShowCases"(resources: "orgShowCase", namespace:"api")

	}

}
