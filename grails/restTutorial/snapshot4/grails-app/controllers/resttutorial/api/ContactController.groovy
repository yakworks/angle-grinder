package resttutorial.api

import grails.plugin.dao.RestDaoController
import grinder.Pager
import resttutorial.Contact
import static org.springframework.http.HttpStatus.OK

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
