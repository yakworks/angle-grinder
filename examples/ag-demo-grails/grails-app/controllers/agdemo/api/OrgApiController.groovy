package agdemo.api

import agdemo.Org
import gorm.restapi.controller.RestApiRepoController
import gorm.tools.Pager
import gorm.tools.hibernate.criteria.CriteriaUtils
import grails.converters.JSON

class OrgApiController extends BaseApiDomainController<Org> {
    OrgApiController() {
        super(Org, false)
    }
    def selectFields = ["*"]

    def listCriteria() {
        def pager = new Pager(params)
        def crit = Org.createCriteria()

        def filters = params.filters ? JSON.parse(params.filters) : null
        def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

        def datalist = crit.list(max: pager.max, offset: pager.offset) {
            if (qslike) {
                or {
                    ilike 'name', qslike
                    ilike 'num', qslike
                }
            }

            if (filters?.name)
                ilike 'name', filters.name + "%"

            if (filters?.num)
                ilike 'num', filters.num + "%"
            if (filters?.id)
                eq 'id', filters.id.toLong()
            if (filters?.ids)
                inList 'id', (filters.ids as Long[])
            if (filters?.zone)
                eq 'timeZone', filters.zone
            if (filters?.zones)
                inList 'timeZone', (filters.zones as String[])
           // CriteriaUtils.applyOrder(params, delegate)
        }

        return datalist
    }

    def pickList() {
        def pager = new Pager(params)
        def crit = Org.createCriteria()
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
