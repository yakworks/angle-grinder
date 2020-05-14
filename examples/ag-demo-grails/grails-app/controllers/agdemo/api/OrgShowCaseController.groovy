package agdemo.api

import agdemo.OrgShowCase
import gorm.tools.Pager
import gorm.tools.beans.BeanPathTools
import gorm.tools.beans.DateUtil
import gorm.tools.repository.RepoMessage
import grails.converters.JSON

class OrgShowCaseController extends BaseDomainController {
    def domainClass = OrgShowCase
    def ajaxGrid = true

    def selectFields = ["*"]

    def index() {}

    def get() {
        def org = domainClass.get(params.id)
        if (org) {
            render BeanPathTools.buildMapFromPaths(org, selectFields) as JSON
        } else {
            render RepoMessage.notFound(domainClass.name, [id: params.id])
        }
    }

    def searchPartial() {
        def orgShowCase = new OrgShowCase()
        render(template: "search1", model: [orgShowCase: orgShowCase])
    }

    protected def listCriteria() {
        def pager = new Pager(params)
        def crit = domainClass.createCriteria()

        def filters = params.filters ? JSON.parse(params.filters) : null
        def qslike = (filters?.quickSearch) ? (filters?.quickSearch + "%") : null

        def datalist = crit.list(max: pager.max, offset: pager.offset) {

            if (filters?.name)
                ilike 'name', filters.name

            if (filters?.exampleDate?.from) {
                def from = DateUtil.parseJsonDate(filters.exampleDate.from)
                gt 'exampleDate', from
            }

            if (filters?.exampleDate?.to) {
                def to = DateUtil.parseJsonDate(filters.exampleDate.to)
                lt 'exampleDate', to
            }

            if (filters?.exampleLocalDate?.from) {
                def from = new Date(filters.exampleLocalDate.from)
                gt 'exampleLocalDate', from
            }

            if (filters?.exampleLocalDate?.to) {
                def to = new Date(filters.exampleLocalDate.to)
                lt 'exampleLocalDate', to
            }

            if (filters?.exampleDatetime?.from) {
                def from = new Date(filters.exampleDatetime.from)
                gt 'exampleDatetime', from
            }

            if (filters?.exampleDatetime?.to) {
                def to = new Formatter.DateTime(filters.exampleDatetime.to)
                lt 'exampleDatetime', to
            }

            if (params.sort)
                order(params.sort, params.order)
        }

        return datalist
    }

}
