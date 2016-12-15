package resttutorial.api

import resttutorial.Contact

import grails.plugin.dao.RestDaoController

class ContactController extends RestDaoController {

  static responseFormats = ['json']
  static namespace = "api"

  ContactController() {
    super(Contact)
  }

  def inactivate() {
    Contact contact = dao.inactivate(params.contactId as Long)
    respond contact
  }

}
