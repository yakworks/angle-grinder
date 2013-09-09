modules = {
    admin {
        dependsOn "vendor,angleGrinder"

        resource url: "/css/style.css"

        // users
        resource url: "/coffee/controllers/user/listCtrl.coffee"
        resource url: "/coffee/controllers/user/formCtrl.coffee"

        // org
        resource url: "/coffee/adminOrg.coffee"
        resource url: "/coffee/controllers/org/listCtrl.coffee"
        resource url: "/coffee/controllers/org/massUpdateFormCtrl.coffee"
        resource url: "/coffee/controllers/org/showCtrl.coffee"
        resource url: "/coffee/controllers/org/formCtrl.coffee"

        // tabbed org
        resource url: "/coffee/adminTabbedOrg.coffee"
        resource url: "/coffee/controllers/tabbedOrg/showCtrl.coffee"
        resource url: "/coffee/controllers/tabbedOrg/contactListCtrl.coffee"
    }
}
