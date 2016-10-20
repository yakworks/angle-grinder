package agdemo

class UrlMappings {

	static mappings = {
		"/$controller/$action?/$id?" {
			constraints {
				// apply constraints here
			}
		}

		"/"(controller: "OrgTabs", action: "index")
		"500"(view: "/error")
	}

}
