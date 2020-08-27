package demo

import grails.converters.JSON
import grails.core.GrailsApplication
import groovy.json.JsonSlurper

class BootStrap {

    GrailsApplication grailsApplication

    def init = { servletContext ->
        def customerFile = grailsApplication.mainContext.getResource('classpath:Customers.json')
        Object customers = new JsonSlurper().parse(customerFile.getInputStream())
        Customer.repo.batchCreate([:], customers)

        def tagFile = grailsApplication.mainContext.getResource('classpath:Tags.json')
        Object tags = new JsonSlurper().parse(tagFile.getInputStream())
        Tag.repo.batchCreate([:], tags)

        def invoiceFile = grailsApplication.mainContext.getResource('classpath:Invoices.json')
        Object invoices = new JsonSlurper().parse(invoiceFile.getInputStream())
        invoices.collect{Invoice.create((it as Map))}

    }
    def destroy = {
    }
}
