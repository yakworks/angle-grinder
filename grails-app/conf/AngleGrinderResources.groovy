def plugin = "angle-grinder"
def dist = "${plugin}"

modules = {

    jquery {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "jquery.min.js"]
    }

    angularjsAll {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angularjs-all.min.js"]
    }

    bootstrap {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "bootstrap.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "bootstrap.min.js"]
    }

    vendor {
        dependsOn "jquery,angularjsAll,bootstrap"
    }

    angleGrinder {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "gridz.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "gridz.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angle-grinder.alerts.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angle-grinder.forms.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angle-grinder.gridz.min.js"]
    }

}
