package resttutorial.api

import grails.plugin.dao.Pager
import grails.plugin.dao.RestDaoController
import grails.plugin.springsecurity.annotation.Secured
import resttutorial.Address

@Secured(['ROLE_ADMIN'])
class AddressController extends RestDaoController {
  static responseFormats = ['json']
  static namespace = "api"

	AddressController() {
    super(Address)
  }

  @Override
  protected List<Address> listAllResources(Map params) {
    def crit = Address.createCriteria()
    def pager = new Pager(params)
    def datalist = crit.list(max: pager.max, offset: pager.offset) {
      if(params.contactId){
          eq "contact.id", (params.contactId as Long)
      }
      if (params.sort)
        order(params.sort, params.order)
    }
    return datalist
  }
}
