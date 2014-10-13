def plugin = "angle-grinder"
def dist = "angleGrinder"

modules = {

    jquery {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "jquery.min.js"]
    }

    lodash {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "lodash.min.js"]
    }

    angularjsAll {
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angularjs-all.min.js"]
    }

    bootstrapCss {
      resource url: [plugin: plugin, dir: "${dist}/styles", file: "bootstrap.min.css"]
      resource url: [plugin: plugin, dir: "${dist}/styles", file: "bootstrap-extras.min.css"]
    }

    bootstrap {
        dependsOn "bootstrapCss"
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "bootstrap.min.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "bootstrap-extras.min.js"]
    }

    xeditable {
      resource url: [plugin: plugin, dir: "${dist}/styles", file: "angular.xeditable.min.css"]
      resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angular.xeditable.min.js"]
    }

    vendor {
        dependsOn "jquery,lodash,angularjsAll,bootstrap,xeditable"
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

        resource url: [plugin: plugin, dir: "js", file: "application.js"]
        resource url: [plugin: plugin, dir: "js", file: "modules/resources.js"]
    }

    angleGrinderFileUpload {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "angleGrinder.file-upload.min.css"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "angleGrinder.file-upload.min.js"]
    }

}
