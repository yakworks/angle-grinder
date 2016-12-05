package resttutorial

import grails.plugin.dao.DaoUtil
import grails.plugin.dao.GormDaoSupport
import grails.transaction.Transactional

@Transactional
class ContactDao extends GormDaoSupport {
  Class domainClass = Contact

  Map insert(Map params) {
    String name = params.remove("name")
    if (name) {
      def (fname, lname) = name.split()
      params.firstName = fname
      params.lastName = lname
    }
    super.insert(params)
  }

  Contact inactivate(Long id) {
    Contact contact = Contact.get(id)

    DaoUtil.checkFound(contact, [id: id] ,domainClass.name)
    DaoUtil.checkVersion(contact , [id: id].version)

    contact.inactive = true
    contact.persist()
    contact
  }
}
