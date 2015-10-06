package example

import com.coderberry.faker.FakerService
import grails.converters.JSON
import grails.plugin.dao.DaoUtil
import grinder.User
import grinder.UserController
import org.joda.time.LocalDate

class UserControllerTests extends GroovyTestCase {

	def fakerService
	def controller

	void setUp() {
		fakerService = new FakerService()
		controller = new UserController()
	}

	void testBirthDateFromSearch() {
		def user = User.first()
		user.birthDate = new LocalDate("2116-01-01")
		user.persist()
		controller.params.filters = new JSON([
				birthDate: [from: "2115-01-01"]
		]).toString()


		def list = controller.listCriteria()

		assertEquals 1, list.size()
		assertEquals user.login, list[0].login
	}

	void testBirthDateBetweenSearch() {
		def user = User.first()
		user.birthDate = new LocalDate("2116-01-01")
		user.persist()
		def lastUser = User.last()
		lastUser.birthDate = new LocalDate("2119-01-01")
		lastUser.persist()

		DaoUtil.flushAndClear()
		controller.params.filters = new JSON([
				birthDate: [from: "2115-01-01", to: "2116-02-01"]
		]).toString()


		def list = controller.listCriteria()

		assertEquals 1, list.size()
		assertEquals user.login, list[0].login
	}


}
