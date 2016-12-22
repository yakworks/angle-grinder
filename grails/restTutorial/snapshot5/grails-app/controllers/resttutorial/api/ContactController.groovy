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

  @Override
  protected List<Contact> listAllResources(Map params) {
    def crit = Contact.createCriteria()
    def pager = new Pager(params)
    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      if (params.sort)
        order(params.sort, params.order)
    }
    return datalist
  }
}
