modules = {
    admin {
        dependsOn "vendor,angleGrinder"

        resource url: "/css/style.css"

        // users
        resource url: "/coffee/controllers/user/list_ctrl.coffee"
        resource url: "/coffee/controllers/user/search_ctrl.coffee"
        resource url: "/coffee/controllers/user/form_ctrl.coffee"

        // org
        resource url: "/coffee/admin_org.coffee"
        resource url: "/coffee/controllers/org/list_ctrl.coffee"
        resource url: "/coffee/controllers/org/show_ctrl.coffee"
        resource url: "/coffee/controllers/org/form_ctrl.coffee"

        // tabbed org
        resource url: "/coffee/admin_tabbed_org.coffee"
        resource url: "/coffee/controllers/tabbed_org/show_ctrl.coffee"
    }
}
