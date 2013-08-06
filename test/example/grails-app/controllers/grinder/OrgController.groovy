package grinder

import grails.converters.JSON

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

}
