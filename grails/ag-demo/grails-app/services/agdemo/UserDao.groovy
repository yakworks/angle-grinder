package agdemo

import grails.plugin.dao.GormDaoSupport
import grails.plugin.dao.DomainException
import grails.plugin.dao.DaoUtil
import grails.plugin.dao.DaoMessage

class UserDao extends GormDaoSupport {
    Class domainClass = User

    Map update(params) {
        def user = User.get(params.id)

        DaoUtil.checkFound(user, params, User.name)
        DaoUtil.checkVersion(user, params.version)

        persistWithParams(user, params)

        return [ok: true, entity: user, message: DaoMessage.updated(user)]
    }

    /**
     * Inserts and calls save for a new domain entity based with the data from params
     *
     * @param params the parameter map or json
     * @throws DomainException if a validation error happens
     */
    Map insert(params) {
        def user = new User()

        user.contact = new Contact()
        persistWithParams(user, params)

        return [ok: true, entity: user, message: DaoMessage.created(user)]
    }

    void persistWithParams(user, params) {
		if (params["activeDate"] && params["activeDate"] instanceof String) {
			println "Use date ${params?.activeDate}"
		}

        user.properties = params
        user.contact.properties["firstName", "lastName", "email", "tagForReminders", "type"] = params["contact"]

        def org = Org.get(params.contact.org.id)
        user.contact.org = org

        try {
            checkPasswordChange(user, params)
            user.contact.persist()
            save(user)
            DaoUtil.flush()
        } catch (DomainException e) {
            e.meta = [user: user]
            throw e
        }
    }

    /**
     * checks params to see if password exists, that is matches repassword and encodes it if so
     * finally setting it to the passwd field on User.
     */
    def checkPasswordChange(user, params) {
        if (params.password?.trim()) {
            if (params.password != params.repassword) {
                def msg = DaoMessage.setup("password.mismatch", [0], "The passwords you entered do not match")
                throw new DomainException(msg, user)
            } else {
                user.passwd = params.password
            }
        }
    }

	def parseDate(String dateName, def params){
		if (params[dateName] && params[dateName] instanceof String) {
			params[dateName] = DateUtil.parseJsonDate(params[dateName])
		}
	}
}
