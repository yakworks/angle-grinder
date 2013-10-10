package grinder

import grails.plugin.dao.DaoMessage
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DomainException
import grails.plugin.dao.GormDaoSupport

class OrgDao extends GormDaoSupport {
    Class domainClass = Org

    Map insert(params) {
        def org = new Org()
        org.properties = params

        try {
            save(org)
            DaoUtil.flush()
        } catch (DomainException e) {
            e.meta = [user: org]
            throw e
        }

        return [ok: true, entity: org, message: DaoMessage.created(org)]
    }

    Map update(params) {
        def org = Org.get(params.id.toLong())

        org.properties = params
        save(org)
        DaoUtil.flush()

        return [ok: true, entity: org, message: DaoMessage.updated(org)]
    }
}
