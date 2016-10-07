package grinder

import grails.converters.JSON
import grails.plugin.dao.DomainException

class OrgController extends BaseDomainController {

    def domainClass = Org
    def ajaxGrid = true

    def selectFields = ["*"]


}
