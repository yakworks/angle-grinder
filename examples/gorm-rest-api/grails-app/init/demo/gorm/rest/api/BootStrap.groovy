package demo.gorm.rest.api

import grails.converters.JSON
import grails.core.GrailsApplication
import groovy.json.JsonSlurper

class BootStrap {

    GrailsApplication grailsApplication

    def init = { servletContext ->
        def customerFile = grailsApplication.mainContext.getResource('classpath:Customers.json')
        Object customers = new JsonSlurper().parse(customerFile.getInputStream())
        Customer.repo.batchCreate([:], customers)
    }
    def destroy = {
    }
}
