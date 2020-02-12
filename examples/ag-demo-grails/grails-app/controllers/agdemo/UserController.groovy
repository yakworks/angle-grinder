package agdemo

import gorm.tools.Pager
import gorm.tools.beans.BeanPathTools
import gorm.tools.beans.DateUtil
import gorm.tools.beans.IsoDateUtil
import gorm.tools.repository.errors.EntityValidationException
import grails.converters.JSON

class UserController extends BaseDomainController {
    static final int SC_UNPROCESSABLE_ENTITY = 422

    def domainClass = User

    def selectFields = ["*", "contact.*"]

    def index() {
    }

    protected def listCriteria() {
        def pager = new Pager(params)
        def crit = domainClass.createCriteria()

        def filters = params.filters ? JSON.parse(params.filters) : null
        def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

        def datalist = crit.list(max: pager.max, offset: pager.offset) {
            createAlias("contact", "contact")

            if (qslike) {
                or {
                    ilike 'login', qslike
                    ilike 'contact.lastName', qslike
                    ilike 'contact.firstName', qslike
                    ilike 'contact.email', qslike
                }
            }
            if (filters?.org) {
                'in' ('contact.org.id', filters.org.collect { it.id as Long })
            }
            if (filters?.orgIds) {
                'in' ('contact.org.id', (filters.orgIds as Long[]) )
            }

            def fcontact = filters?.contact
            if (fcontact?.name) {
                or {
                    ilike 'contact.lastName', fcontact.name
                    ilike 'contact.firstName', fcontact.name
                }
            }
            if (fcontact?.email)
                ilike 'contact.email', fcontact.email

            if (fcontact?.type) {
                def contactTypes = fcontact.type.collect {
                    ContactType.byName(it.id)
                }

                'in' 'contact.type', contactTypes
            }

            if (filters?.login)
                ilike 'login', filters.login
            if (filters?.activeDate?.from)
                gte 'activeDate', DateUtil.fromLocalDate(IsoDateUtil.parseLocalDate(filters?.activeDate?.from))
            if (filters?.activeDate?.to)
                lte 'activeDate', DateUtil.fromLocalDate(IsoDateUtil.parseLocalDate(filters?.activeDate?.to))

            if (params.sort)
                order(params.sort, params.order)
        }

        return datalist
    }

    // TODO serve it as static assets
    def formTemplate() {
        render(template: "form")
    }

    // TODO serve it as static assets
    def searchPartial() {
        def user = new User()
        render(template: "search", model: [user: user])
    }

    def saveOrUpdate() {
        try {
            def entity = params.id ? repo.update(params) : repo.create(params)
            render BeanPathTools.buildMapFromPaths(entity, selectFields) as JSON
        } catch (EntityValidationException e) {
            response.status = 409
            def emsg = (e.hasProperty("messageMap")) ? g.message(code: e.messageMap?.code, args: e.messageMap?.args, default: e.messageMap?.defaultMessage) : null
            render(plugin: "rally", template: "edit", model: [user: e.meta?.user ?: e.entity, errorMsg: emsg])
        }
    }

    def get() {
        def user = User.get(params.id)
        if (user) {
            render BeanPathTools.buildMapFromPaths(user, selectFields) as JSON
        } else {
            notFound params.id
        }
    }

}
