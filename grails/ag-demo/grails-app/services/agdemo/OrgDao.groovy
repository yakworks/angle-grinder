package agdemo

import grails.plugin.dao.DaoMessage
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DomainException
import grails.plugin.dao.GormDaoSupport
import grinder.DateUtil

class OrgDao extends GormDaoSupport {
    Class domainClass = Org

    Map insert(params) {
        def org = new Org()
        persistWithParams(org, params)

        [ok: true, entity: org, message: DaoMessage.created(org)]
    }

    Map update(params) {
        def org = Org.get(params.id.toLong())
        persistWithParams(org, params)

        [ok: true, entity: org, message: DaoMessage.updated(org)]
    }

    void persistWithParams(org, params) {
        if (params.addressDate && params.addressDate instanceof String) {
            params.addressDate = DateUtil.parseJsonDate(params.addressDate)
        }
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
