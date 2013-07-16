def plugin = "angle-grinder"
def dist = "${plugin}"

modules = {

    "jquery" {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "jquery.min.js"]
    }

    "angularjs-all" {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angularjs-all.min.js"]
    }

    "bootstrap" {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "bootstrap.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "bootstrap.min.js"]
    }

    "angleGrinder" {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "gridz.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "gridz.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angle-grinder.gridz.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angle-grinder.forms.min.js"]
    }

    "vendor" {
        dependsOn "jquery,angularjs-all,bootstrap"
    }

    "admin" {
        dependsOn "vendor,angleGrinder"

        resource url: [plugin: plugin, dir: "coffee", file: "modules/resources.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "application.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "controllers/users_ctrl.coffee"]
    }

}
