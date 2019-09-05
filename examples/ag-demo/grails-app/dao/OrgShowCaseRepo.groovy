package agdemo

import gorm.tools.repository.GormRepo
import gorm.tools.repository.RepoMessage
import gorm.tools.repository.errors.EntityValidationException

class OrgShowCaseRepo implements GormRepo<OrgShowCase> {
    Map insert(params) {
        def org = new OrgShowCase()
        persistWithParams(org, params)

        [ok: true, entity: org, message: RepoMessage.created(org)]
    }

    Map update(params) {
        def org = OrgShowCase.get(params.id.toLong())
        persistWithParams(org, params)

        [ok: true, entity: org, message: RepoMessage.updated(org)]
    }

    void persistWithParams(org, params) {
        org.properties = params
        try {
            org.persist()
            DaoUtil.flush()
        } catch (EntityValidationException e) {
            e.meta = [org: org]
            throw e
        }
    }

}
