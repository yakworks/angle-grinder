
def pname = "angle-grinder"
def vendor = "angle-grinder/third-party"

modules = {

    'ag-boot-css' {        
        resource url:[plugin: pname, dir: "${pname}/dist/styles", file:'boot.css']
        resource url:[plugin: pname, dir: "${pname}/styles", file:'jq-ui-boot-grid.css']
    }
    
    'jquery-19' {
        //defaultBundle 'core'
        resource url:[plugin: pname, dir: "${vendor}/jquery", file:'jquery.min.js']
    }
    
    'ag-boot-jq-ui' {
        dependsOn 'jquery-19'
        resource url:[plugin: pname, dir: "${vendor}/jquery-ui-bootstrap", file:'jquery-ui-1.10.1.custom.min.js']
        resource url:[plugin: pname, dir: "${vendor}/bootstrap/js", file:'bootstrap.min.js']
    }
    
    'ag-gridz' {
        dependsOn 'ag-boot-jq-ui'
        resource url:[plugin: pname, dir: "${vendor}/jqgrid/plugins", file:'ui.multiselect.js']
        resource url:[plugin: pname, dir: "${vendor}/jqgrid/js/i18n", file:'grid.locale-en.js']
        resource url:[plugin: pname, dir: "${vendor}/jqgrid/js", file:'grid.base.js']
        resource url:[plugin: pname, dir: "${vendor}/jqgrid/js", file:'grid.jqueryui.js']
        resource url:[plugin: pname, dir: "${vendor}/jqgrid/js", file:'jquery.fmatter.js']
        resource url:[plugin: pname, dir: "${pname}/scripts", file:'gridz.js']
        resource url:[plugin: pname, dir: "${pname}/scripts", file:'gridFormEdit.js']
        resource url:[plugin: pname, dir: "${vendor}/bootstrapx-clickover/js", file:'bootstrapx-clickover.js']
    }

    'ag-login' {
        dependsOn 'ag-boot-css'
        resource url:[plugin: pname, dir: "${pname}/styles", file:'login.css']
    }
    
    'ag-util' {
        resource url:[plugin: pname, dir: "${vendor}/spin.js", file:'spin.min.js']
    }

    angular {
        dependsOn 'jquery-19'
        resource id: 'js', url: [plugin: pname, dir: "${vendor}/angular", file: "angular.min.js"], nominify: true
        resource id: 'js', url: [plugin: pname, dir: "${vendor}/angular-resource", file: "angular-resource.min.js"], nominify: true
    }
    'angular-ui' {
        dependsOn 'angular'
        resource id: 'js', url: [plugin: pname, dir: "${vendor}/angular-ui/build", file: "angular-ui.js"], nominify: true
        resource id: 'js', url: [plugin: pname, dir: "${vendor}/select2", file: "select2.min.js"], nominify: true
        resource url: [plugin: pname, dir: "${vendor}/select2", file: "select2.css"]
        resource url: [plugin: pname, dir: "${vendor}/select2-bootstrap-css", file: "select2-bootstrap.css"]
    }
    'angular-bootstrap' {
        dependsOn 'angular'
        resource id: 'js', url: [plugin: pname, dir: "${vendor}/angular-bootstrap", file:"ui-bootstrap-tpls.js"], nominify: true
    }


}