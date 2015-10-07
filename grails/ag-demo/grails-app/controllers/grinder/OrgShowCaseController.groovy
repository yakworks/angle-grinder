package grinder

import grails.converters.JSON

class OrgShowCaseController extends BaseDomainController {
    def domainClass = OrgShowCase
    def ajaxGrid = true

    def selectFields = ["*"]

    def index() {}

    def get() {
        def org = domainClass.get(params.id)
        if (org) {
            render ExportUtil.buildMapFromPaths(org, selectFields) as JSON
        } else {
            notFound params.id
        }
    }

}
