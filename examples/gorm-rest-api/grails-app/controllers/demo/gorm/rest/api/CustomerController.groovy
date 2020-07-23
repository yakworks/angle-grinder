package demo.gorm.rest.api

import gorm.restapi.controller.RestApiRepoController
import gorm.tools.Pager
import grails.converters.JSON
import org.grails.datastore.mapping.query.api.BuildableCriteria

class CustomerController extends RestApiRepoController<Customer> {
    static allowedMethods = [list  : ["GET", "POST"], create: "POST",
                             put: ["PUT", "PATCH"], delete: "DELETE",
                             update: ["PUT", "PATCH"]]

    CustomerController() {
        super(Customer, false)
    }

    def index() {
        Pager pager = new Pager(params)

        Pager pagedList = pager.setupData(listCriteria(), ['*'])
        Map resp =pagedList.jsonData
        resp.data = resp.rows
        respond resp
    }

    // TODO fix urlMapping to make it work
    def customAction() {
        render 'Yeah it works'
    }

    List listCriteria() {
        Pager pager = new Pager(params)
        BuildableCriteria crit = getEntityClass().createCriteria()

        Map filters = params.filters ? JSON.parse(params.filters) as Map : null
        def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

        List datalist = crit.list(max: pager.max, offset: pager.offset) {
            if (qslike) {
                or {
                    ilike 'name', qslike
                    ilike 'num', qslike
                }
            }
            if (filters?.city)
                ilike 'city', filters.city + "%"
            if (filters?.country)
                ilike 'country', filters.country + "%"
            if (filters?.state)
                ilike 'state', filters.state + "%"

            if (filters?.name)
                ilike 'name', filters.name.split(',')
            if (filters?.num)
                'inList' 'num', filters.num.split(',')
            if (filters?.timezone)
                eq 'timezone', filters.zontimezonee
        }

        return datalist
    }

}
