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

  @Override
  def index(){
    def pageData = new Pager(params)
    respond pageData.setupData(listAllResources(params)).jsonData

  }

  @Override
  protected List listAllResources(Map params) {
    def crit = resource.createCriteria()
    def pager = new Pager(params)
    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      if (params.sort)
        order(params.sort, params.order)
    }
    return datalist
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
