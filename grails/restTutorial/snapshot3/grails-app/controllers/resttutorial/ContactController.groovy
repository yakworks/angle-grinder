package resttutorial

import static org.springframework.http.HttpStatus.*
import grails.plugin.dao.DomainNotFoundException
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
    } catch (DomainNotFoundException e){
      render view: "../notFound", model: [message: e.message]
      return
    }

    respond contact
  }


}
