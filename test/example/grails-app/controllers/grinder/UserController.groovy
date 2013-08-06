package grinder

import grails.converters.JSON
import grails.plugin.dao.DomainException

import static javax.servlet.http.HttpServletResponse.SC_CREATED

class UserController extends BaseDomainController {
    static final int SC_UNPROCESSABLE_ENTITY = 422
    def domainClass = User
    def ajaxGrid = true

    def selectFields = ["*"]

    //injected beans
    def grinderLabelService

    def index() {
    }

    protected def listCriteria() {
        def pager = new Pager(params)
        def crit = domainClass.createCriteria()

        def filters = params.filters ? JSON.parse(params.filters) : null
        println "params:$params"
        println "filters:$filters"

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
            if(filters?.org){
                'in' ('contact.org.id', filters.org.collect {it.id as Long })
            }

            //XXX ken refactor this part so it works with you helpers
            def fcontact = filters?.contact
            if (fcontact?.name) {
                or {
                    ilike 'contact.lastName', fcontact.name
                    ilike 'contact.firstName', fcontact.name
                }
            }
            if (fcontact?.email)
                ilike 'contact.email', fcontact.email

            if (filters?.login)
                ilike 'login', filters.login

            if (params.sort)
                order(params.sort, params.order)
        }

        return datalist
    }

    def formTemplate() {
        render(template: "form")
    }

    def searchPartial() {
        def user = new User()
        render(template: "search", model: [user: user])
    }

    def saveOrUpdate() {
        try {
            def result = params.id ? dao.update(params) : dao.insert(params)
            //all was good render a success save message
            //return ExportUtil.buildMapFromPaths(obj,fieldList)
            render ExportUtil.buildMapFromPaths(result.entity, selectFields) as JSON
        } catch (DomainException e) {
            response.status = 409
            def emsg = (e.hasProperty("messageMap")) ? g.message(code: e.messageMap?.code, args: e.messageMap?.args, default: e.messageMap?.defaultMessage) : null
            render(plugin: "rally", template: "edit", model: [user: e.meta?.user ?: e.entity, errorMsg: emsg])
        }
    }

    def get() {
        def inst = User.get(params.id)
        if (inst) {
            //cache false
            //sleep(1000)
            render ExportUtil.buildMapFromPaths(inst, selectFields) as JSON
        } else {
            notFound params.id
        }
    }

    def columnModel() {
        grinderLabelService.columnSetup(columnModel)
        render columnModel as JSON
    }

    def saveTest() {
        def json = request.JSON
        println "JSON " + json
        println "JSON Class " + json.getClass()
        def gson = request.GSON
        println "YYYYYYYY " + gson.class
        //assert gson.contact.firstName == "f"
        def instance = new User(request.GSON)
        assert instance.contact.firstName == "f"
        def responseJson = [:]
        if (instance.save(flush: true)) {
            response.status = SC_CREATED
            responseJson.id = instance.id
            responseJson.message = message(code: 'default.created.message', args: [message(code: 'album.label', default: 'Album'), instance.id])
        } else {
            response.status = SC_UNPROCESSABLE_ENTITY
            responseJson.errors = instance.errors.fieldErrors.collectEntries {
                [(it.field): message(error: it)]
            }
        }
        cache false
        render responseJson as JSON
    }

}
