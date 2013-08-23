def plugin = "angle-grinder"
def dist = "angleGrinder"

modules = {

    jquery {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "jquery.min.js"]
    }

    underscore {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "underscore.min.js"]
    }

    angularjsAll {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angularjs-all.min.js"]
    }

    bootstrap {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "bootstrap.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "bootstrap.min.js"]
    }

    vendor {
        dependsOn "jquery,underscore,angularjsAll,bootstrap"
    }

    angleGrinder {
        resource url: [plugin: plugin, dir: "styles", file: "style.css"]
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "gridz.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "gridz.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angleGrinder.common.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angleGrinder.alerts.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angleGrinder.forms.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angleGrinder.gridz.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angleGrinder.spinner.min.js"]

        resource url: [plugin: plugin, dir: "coffee", file: "application.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "modules/resources.coffee"]
    }

}
