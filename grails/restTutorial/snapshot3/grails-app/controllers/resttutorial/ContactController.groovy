package resttutorial

import grails.plugin.dao.RestDaoController

class ContactController extends RestDaoController {
  static responseFormats = ['json']

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
