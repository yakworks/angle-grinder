/* Copyright 2019. 9ci Inc. Licensed under the Apache License, Version 2.0 */
package grinder

class UrlMappings {

    static mappings = {
        "/$controller/$action?/$id?" {
            constraints {
                // apply constraints here
            }
        }

        "/"(view: "/index")
        "500"(view: '/error')
    }

}
