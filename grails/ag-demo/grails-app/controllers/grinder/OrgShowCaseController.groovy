package grinder

import grails.converters.JSON
import org.joda.time.DateTime
import org.joda.time.LocalDate

class OrgShowCaseController extends BaseDomainController {
    def domainClass = OrgShowCase
    def ajaxGrid = true

    def selectFields = ["*"]



    def formTemplate() {
        render(template: "form")
    }

    def searchPartial() {
        def orgShowCase = new OrgShowCase()
        render(template: "search", model: [orgShowCase: orgShowCase])
    }

}
