package demo.api

import grails.converters.JSON
import grails.core.GrailsApplication

class AppConfigController {
    static namespace = 'api'
    GrailsApplication grailsApplication
    def getConfig() {
        ConfigObject appConfig = grailsApplication.config.restApi[configActionName()]
        render appConfig as JSON
    }


    String configActionName() {
        request.forwardURI.split('/')[-1]
    }

}
