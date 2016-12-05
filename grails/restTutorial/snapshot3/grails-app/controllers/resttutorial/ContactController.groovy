package resttutorial

import grails.plugin.dao.DomainException
import grails.plugin.dao.RestDaoController

class ContactController extends RestDaoController {
  static responseFormats = ['json']

  ContactController() {
    super(Contact)
  }

  def inactivate() {
    Contact contact
    try {
      contact = dao.inactivate(params.contactId as Long)
    } catch (DomainException e){
      respond e.cause
      return
    }

    respond contact
  }


}
