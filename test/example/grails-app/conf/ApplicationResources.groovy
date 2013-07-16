modules = {
    admin {
        dependsOn "vendor,angleGrinder"

        resource url: "/coffee/modules/resources.coffee"
        resource url: "/coffee/application.coffee"
        resource url: "/coffee/controllers/users_ctrl.coffee"
    }
}
