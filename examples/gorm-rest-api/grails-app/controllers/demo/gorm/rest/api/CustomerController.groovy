package demo.gorm.rest.api

import gorm.restapi.controller.RestApiRepoController
import gorm.tools.Pager
import grails.converters.JSON

class CustomerController extends RestApiRepoController<Customer> {
    static allowedMethods = [list  : ["GET", "POST"], create: "POST",
                             put: ["PUT", "PATCH"], delete: "DELETE",
                             update: ["PUT", "PATCH"]]

    CustomerController() {
        super(Customer, false)
    }

    def index() {
        Pager pager = new Pager(params)

        Pager pagedList = pager.setupData(Customer.list(), ['*'])
        Map resp =pagedList.jsonData
        resp.data = resp.rows
        respond resp
    }

    // TODO fix urlMapping to make it work
    def customAction() {
        render 'Yeah it works'
    }

}
