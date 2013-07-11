def plugin = "angle-grinder"
def dist = "${plugin}/dist"
def vendor = "${dist}/third-party"

modules = {

    "ag-boot-css" {
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "boot.css"]
    }

    "ag-grid-css" {
        dependsOn "ag-boot-css"
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "jq-ui-boot-grid.css"]
    }

    "jquery-19" {
        //defaultBundle "core"
        resource url: [plugin: plugin, dir: "${vendor}/jquery", file: "jquery.js"]
    }

    "ag-boot-jq-ui" {
        dependsOn "jquery-19"
        resource url: [plugin: plugin, dir: "${vendor}/jquery-ui-bootstrap", file: "jquery-ui-1.10.1.custom.min.js"]
        resource url: [plugin: plugin, dir: "${vendor}/bootstrap/js", file: "bootstrap.js"]
    }

    "ag-gridz" {
        dependsOn "ag-boot-jq-ui"
        resource url: [plugin: plugin, dir: "${vendor}/jqgrid/js/plugins", file: "ui.multiselect.js"]
        resource url: [plugin: plugin, dir: "${vendor}/jqgrid/js/i18n", file: "grid.locale-en.js"]
        resource url: [plugin: plugin, dir: "${vendor}/jqgrid/js", file: "grid.base.js"]
        resource url: [plugin: plugin, dir: "${vendor}/jqgrid/js", file: "grid.jqueryui.js"]
        resource url: [plugin: plugin, dir: "${vendor}/jqgrid/js", file: "jquery.fmatter.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "gridz.js"]
        resource url: [plugin: plugin, dir: "${dist}/scripts", file: "grid_form_edit.js"]
        resource url: [plugin: plugin, dir: "${vendor}/bootstrapx-clickover/js", file: "bootstrapx-clickover.js"]
    }

    "ag-login" {
        dependsOn "ag-boot-css"
        resource url: [plugin: plugin, dir: "${dist}/styles", file: "login.css"]
    }

    "ag-util" {
        resource url: [plugin: plugin, dir: "${vendor}/spin.js", file: "spin.js"]
    }

    angular {
        dependsOn "jquery-19"
        resource id: "js", url: [plugin: plugin, dir: "${vendor}/angular", file: "angular.js"], nominify: true
        resource id: "js", url: [plugin: plugin, dir: "${vendor}/angular-resource", file: "angular-resource.js"], nominify: true
    }

    "angular-ui" {
        dependsOn "angular"
        resource id: "js", url: [plugin: plugin, dir: "${vendor}/angular-ui/js", file: "angular-ui.js"], nominify: true
        resource id: "js", url: [plugin: plugin, dir: "${vendor}/select2", file: "select2.js"], nominify: true
        resource url: [plugin: plugin, dir: "${vendor}/select2", file: "select2.css"]
        resource url: [plugin: plugin, dir: "${vendor}/select2-bootstrap-css", file: "select2-bootstrap.css"]
    }

    "angular-bootstrap" {
        dependsOn "angular"
        resource id: "js", url: [plugin: plugin, dir: "${vendor}/angular-bootstrap", file: "ui-bootstrap-tpls.js"], nominify: true
    }

    "angular-scaffolding" {
        dependsOn "angular-ui"

        resource url: [plugin: plugin, dir: "coffee", file: "services.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "directives.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "controllers.coffee"]
        resource url: [plugin: plugin, dir: "coffee", file: "application.coffee"]
    }

}
