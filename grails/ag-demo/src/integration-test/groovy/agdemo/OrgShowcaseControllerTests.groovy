package agdemo

import com.coderberry.faker.FakerService
import grails.converters.JSON
import grails.plugin.dao.DaoUtil
import agdemo.OrgShowCase
import agdemo.OrgShowCaseController
import agdemo.User
import agdemo.UserController
import org.joda.time.LocalDate

class OrgShowcaseControllerTests extends GroovyTestCase {

	def fakerService
	def controller

	void setUp() {
		fakerService = new FakerService()
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

		DaoUtil.flushAndClear()
		controller.params.filters = new JSON([
                exampleLocalDate: [from: "2115-01-01", to: "2116-02-01"]
		]).toString()


		def list = controller.listCriteria()

		assertEquals 1, list.size()
		assertEquals org.name, list[0].name
	}


}
