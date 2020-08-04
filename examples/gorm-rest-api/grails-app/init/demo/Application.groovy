package demo

import gorm.tools.rest.RestApiFromConfig
import grails.boot.GrailsApp
import grails.boot.config.GrailsAutoConfiguration

@RestApiFromConfig
class Application extends GrailsAutoConfiguration {
    static void main(String[] args) {
        GrailsApp.run(Application, args)
    }
}
