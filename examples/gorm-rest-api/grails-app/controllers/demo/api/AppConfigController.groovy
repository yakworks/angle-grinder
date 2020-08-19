package demo.api

import grails.converters.JSON
import grails.core.GrailsApplication

class AppConfigController {
    static namespace = 'api'
    GrailsApplication grailsApplication
    def customer() {
        ConfigObject appConfig = grailsApplication.config.restApi.customer
        render appConfig as JSON
    }

    def invoice() {
        ConfigObject appConfig = grailsApplication.config.restApi.invoice
        render appConfig as JSON
    }

}
