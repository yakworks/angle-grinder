package agdemo

import gorm.tools.repository.GormRepo
import gorm.tools.beans.DateUtil
import gorm.tools.repository.RepoMessage
import gorm.tools.repository.RepoUtil
import gorm.tools.repository.errors.EntityValidationException

class OrgRepo implements GormRepo<Org> {

    Map insert(params) {
        def org = new Org()
        org.orgShowCaseId = new OrgShowCase().persist().id
        persistWithParams(org, params)


        [ok: true, entity: org, message: RepoMessage.created(org)]
    }

    Map update(params) {
        def org = Org.get(params.id.toLong())
        persistWithParams(org, params)

        [ok: true, entity: org, message: RepoMessage.updated(org)]
    }

    void persistWithParams(org, params) {
        if (params.addressDate && params.addressDate instanceof String) {
            params.addressDate = DateUtil.parseJsonDate(params.addressDate)
        }
        org.properties = params
        try {
            org.persist()
            RepoUtil.flush()
        } catch (EntityValidationException e) {
            e.meta = [org: org]
            throw e
        }
    }

}
