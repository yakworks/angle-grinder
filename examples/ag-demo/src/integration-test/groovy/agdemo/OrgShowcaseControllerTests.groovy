package agdemo

import org.joda.time.LocalDate

import agdemo.OrgShowCase
import agdemo.OrgShowCaseController
import gorm.tools.repository.RepoUtil
import grails.converters.JSON
import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import spock.lang.Ignore
import spock.lang.Shared
import spock.lang.Specification

@Integration
@Rollback
class OrgShowcaseControllerTests extends Specification {

  @Shared def controller

    void setup() {
        controller = new OrgShowCaseController()
    }

    void testLocalDateFromSearch() {
        def org = OrgShowCase.first()
        org.exampleLocalDate = new LocalDate("2116-01-01")
        org.persist()
        controller.params.filters = new JSON([
                exampleLocalDate: [from: "2115-01-01"]
        ]).toString()


        def list = controller.listCriteria()

        assertEquals 1, list.size()
        assertEquals org.name, list[0].name
    }

    void testLocalDateBetweenSearch() {
        def org = OrgShowCase.first()
        org.exampleLocalDate = new LocalDate("2116-01-01")
        org.persist()
        def lastOrg = OrgShowCase.last()
        lastOrg.exampleLocalDate = new LocalDate("2119-01-01")
        lastOrg.persist()

        RepoUtil.flushAndClear()
        controller.params.filters = new JSON([
                exampleLocalDate: [from: "2115-01-01", to: "2116-02-01"]
        ]).toString()


        def list = controller.listCriteria()

        assertEquals 1, list.size()
        assertEquals org.name, list[0].name
    }


}
