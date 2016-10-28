package tutorial.api

import grails.plugin.springsecurity.annotation.Secured
import tutorial.Org
@Secured(['ROLE_ADMIN'])
class OrgController extends RestDaoController {

    OrgController(){
        super(Org)
    }
}
