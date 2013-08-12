package grinder

import grails.converters.JSON
import grails.plugin.dao.DomainException

class OrgController extends BaseDomainController {

    def domainClass = Org
    def ajaxGrid = true

    def selectFields = ["*"]

    def index() {
    }

    def pickList() {
        def pager = new Pager(params)
        def crit = domainClass.createCriteria()
        def qslike = (params.q) ? (params.q + "%") : null
        def datalist = crit.list(max: pager.max, offset: pager.offset) {
            if (qslike && qslike != '*%') {
                or {
                    ilike 'name', qslike
                    ilike 'num', qslike
                }
            }

            if (params.sort)
                order(params.sort, params.order)
        }

        def pagedList = pagedList(datalist)
        render pagedList.jsonData as JSON
    }

    def get() {
        def org = Org.get(params.id)
        if (org) {
            render ExportUtil.buildMapFromPaths(org, selectFields) as JSON
        } else {
            notFound params.id
        }
    }

    def saveOrUpdate() {
        try {
            def result = params.id ? dao.update(params) : dao.insert(params)
            render ExportUtil.buildMapFromPaths(result.entity, selectFields) as JSON
        } catch (DomainException e) {
            response.status = 409
            def emsg = (e.hasProperty("messageMap")) ? g.message(code: e.messageMap?.code, args: e.messageMap?.args, default: e.messageMap?.defaultMessage) : null
            render(plugin: "rally", template: "edit", model: [user: e.meta?.user ?: e.entity, errorMsg: emsg])
        }
    }

    def delete() {
        if (request.format == "json" || response.format == "json") {
            def org = domainClass.get(params.id)
            if (org) {
                dao.delete(org)
                render org as JSON
            }
        }
    }

}
