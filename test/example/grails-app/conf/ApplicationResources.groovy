modules = {
    admin {
        dependsOn "vendor,angleGrinder"

        resource url: "/css/style.css"

        resource url: "/coffee/controllers/users_ctrl.coffee"

        resource url: "/coffee/admin_org.coffee"
        resource url: "/coffee/controllers/org/list_ctrl.coffee"
        resource url: "/coffee/controllers/org/show_ctrl.coffee"
        resource url: "/coffee/controllers/org/form_ctrl.coffee"
    }
}
