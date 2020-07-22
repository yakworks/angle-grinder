package demo.gorm.rest.api

import gorm.restapi.controller.RestApiRepoController

class CustomerController extends RestApiRepoController<Customer> {

    CustomerController() {
        super(Customer, false)
    }

    def customAction() {
        render 'Yeah it works'
    }

}
