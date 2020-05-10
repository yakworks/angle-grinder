package agdemo

import gorm.tools.databinding.BindAction
import gorm.tools.repository.GormRepo
import gorm.tools.repository.events.BeforeRemoveEvent
import gorm.tools.repository.events.RepoListener

class OrgRepo implements GormRepo<Org> {

    GormRepo contactRepo

    void beforeBind(Org org, Map params, BindAction action) {
        if (action == BindAction.Create) {

        }
    }

    void afterPersist(Org org, Map args) {
        org.orgShowCaseId = new OrgShowCase().persist().id
    }

    @RepoListener
    void beforeRemove(Org org, BeforeRemoveEvent e) {
        Contact.findAllByOrg(org).each { User.findByContact(it)?.delete(flush: true); it.delete(flush: true) }
    }

}
