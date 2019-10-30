package agdemo

import gorm.tools.databinding.BindAction
import gorm.tools.repository.GormRepo

class OrgRepo implements GormRepo<Org> {


    void beforeBind(Org org, Map params, BindAction action) {
        if(action == BindAction.Create) {

        }
    }

    void afterPersist(Org org, Map args) {
        org.orgShowCaseId = new OrgShowCase().persist().id
    }

}
