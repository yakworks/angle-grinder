package agdemo

import gorm.tools.repository.GormRepo

class OrgShowCaseRepo implements GormRepo<OrgShowCase> {

    /*
    Map insert(params) {
        def org = new OrgShowCase()
        persistWithParams(org, params)

        [ok: true, entity: org, message: DaoMessage.created(org)]
    }

    Map update(params) {
        def org = domainClass.get(params.id.toLong())
        persistWithParams(org, params)

        [ok: true, entity: org, message: DaoMessage.updated(org)]
    }

    void persistWithParams(org, params) {
        org.properties = params
        try {
            save(org)
            DaoUtil.flush()
        } catch (DomainException e) {
            e.meta = [org: org]
            throw e
        }
    }*/

}
