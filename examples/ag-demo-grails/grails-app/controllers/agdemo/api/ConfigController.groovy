package agdemo.api

import grails.converters.JSON
import grails.core.GrailsApplication
import groovy.transform.CompileDynamic
import org.grails.plugins.appsetupconfig.AppSetupService

@CompileDynamic
class ConfigController {
    static namespace = 'api'
    GrailsApplication grailsApplication
    AppSetupService appSetupService
    Map defaultGridOptions = [colModel: [[name: 'id']]]

    protected Map getExternalConfig() {
        ConfigObject controllerConfig = grailsApplication.setupConfig.screens[params.screen]
        return controllerConfig
    }

    protected Map getGridOptions() {
        def options = externalConfig.list.gridz
        if (!options) {
            return defaultGridOptions
        }
        return appSetupService.getValue(options)
    }
    def app(){
        ConfigObject appConfig = grailsApplication.setupConfig.app
        render appConfig as JSON
    }

    def sidebar(){
        render grailsApplication.setupConfig.app.sidebar as JSON
    }

    def gridOptions() {
        println gridOptions
        String gridOptsJson = gridOptions as JSON
        render(gridOptsJson)
    }

}
