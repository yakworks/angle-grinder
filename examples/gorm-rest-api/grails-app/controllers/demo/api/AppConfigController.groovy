package demo.api

import grails.converters.JSON
import grails.core.GrailsApplication

class AppConfigController {
    static namespace = 'api'
    GrailsApplication grailsApplication
    def getConfig() {
        ConfigObject appConfig = grailsApplication.config.restApi[params.entity]
        render appConfig as JSON
    }
}
