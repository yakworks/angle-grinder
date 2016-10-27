package tutorial.api

import grails.rest.RestfulController
import tutorial.Location

class LocationController extends RestDaoController {
    static responseFormats = ['json', 'xml']
    LocationController(){
        super(Location)
    }

    @Override
    protected List listAllResources(Map params) {
        def crit = resource.createCriteria()
        def datalist = crit.list(params) {
            if (params.orgId){
                eq "org.id", params.orgId as Long
            }
        }
        return datalist
    }
}
