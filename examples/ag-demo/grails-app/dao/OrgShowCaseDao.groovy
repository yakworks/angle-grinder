package agdemo

import grails.plugin.dao.DaoMessage
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DomainException
import grails.plugin.dao.GormDaoSupport

class OrgShowCaseDao extends GormDaoSupport {
    Class domainClass = OrgShowCase

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
    }

}
