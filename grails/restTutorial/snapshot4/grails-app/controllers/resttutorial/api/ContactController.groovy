package resttutorial.api

import grails.plugin.dao.DomainException
import grails.plugin.dao.RestDaoController
import resttutorial.Contact

class ContactController extends RestDaoController {
  static responseFormats = ['json']
  static namespace = "api"
  ContactController() {
    super(Contact)
  }

  def inactivate() {
    Contact instance = queryForResource(params.contactId as Long)
    if (instance == null) {
      notFound()
      return
    }
    Contact contact = dao.inactivate(params.contactId as Long)
    respond contact
  }


}
