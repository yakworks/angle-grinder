def plugin = "angle-grinder"
def dist = "${plugin}"

modules = {

    "vendor" {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "vendor.min.js"]
    }

    "bootstrap" {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "bootstrap.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "bootstrap.min.js"]
    }

    "gridz" {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "gridz.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "gridz.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angle-grinder.gridz.min.js"]
    }

    "admin" {
        dependsOn "vendor,bootstrap,gridz"

        resource url: [plugin: plugin, dir: "coffee", file: "modules/resources.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "application.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "controllers/users_ctrl.coffee"]
    }

}
