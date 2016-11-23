package resttutorial

import grails.plugin.dao.DomainException
import grails.plugin.dao.RestDaoController
import grails.rest.RestfulController

class ContactController extends RestfulController {
  static responseFormats = ['json']

  ContactController() {
    super(Contact)
  }

  def inactivate(Long id) {
    try{
      Map result = dao.inactivate(params.id as Long)
      respond result.entity
    }catch(DomainException e){
      respond(e.errors, [status: 422])
    }
  }


}
