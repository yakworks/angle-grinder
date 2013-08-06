modules = {
    admin {
        dependsOn "vendor,angleGrinder"

        resource url: "/css/style.css"
        resource url: "/coffee/controllers/users_ctrl.coffee"
        resource url: "/coffee/controllers/orgs_ctrl.coffee"
    }
}
