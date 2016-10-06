class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?" {
			constraints {
				// apply constraints here
			}
		}

		"/"(controller: "OrgTabs" )
		"500"(view: "/error")

    "/orgs"(resources: "org"){
      action = ["GET": "list"]
      "/notes"(resourses: "note"){
        action = ["GET": "list"]
      }
    }
    "/users"(resources: "user"){
      action = ["GET": "list"]
    }
    "/notes"(resources: "note"){
      action = ["GET": "list"]
    }
	}

}
