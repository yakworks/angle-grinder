modules = {
    admin {
        dependsOn "vendor,angleGrinder"

        resource url: "/css/style.css"

        // users
        resource url: "/js/app/controllers/user/listCtrl.js"
        resource url: "/js/app/controllers/user/searchFormCtrl.js"
        resource url: "/js/app/controllers/user/formCtrl.js"

        // org
        resource url: "/js/app/adminOrg.js"
        resource url: "/js/app/controllers/org/listCtrl.js"
        resource url: "/js/app/controllers/org/massUpdateFormCtrl.js"
        resource url: "/js/app/controllers/org/showCtrl.js"
        resource url: "/js/app/controllers/org/formCtrl.js"

        // tabbed org
        resource url: "/js/app/adminTabbedOrg.js"
        resource url: "/js/app/controllers/tabbedOrg/showCtrl.js"
        resource url: "/js/app/controllers/tabbedOrg/contactListCtrl.js"
        resource url: "/js/app/controllers/tabbedOrg/noteListCtrl.js"
    }
}
