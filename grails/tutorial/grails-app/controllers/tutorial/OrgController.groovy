package tutorial

import grails.rest.RestfulController

class OrgController extends RestfulController {
    static responseFormats = ['json', 'xml']
    OrgController(){
        super(Org)
    }

}
