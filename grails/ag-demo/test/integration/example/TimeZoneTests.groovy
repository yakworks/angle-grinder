package example
import com.coderberry.faker.FakerService
import grinder.ContactType
import grinder.Org
import grinder.User
import grinder.UserDao
import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.LocalDate
import org.joda.time.format.DateTimeFormat
import org.junit.Before
import org.junit.Test

class TimeZoneTests extends GroovyTestCase {
    def FakerService fakerService
    def userDao
	def tzf = DateTimeFormat.forPattern("ZZ")
	def tz = DateTimeZone.getDefault()

    @Before
    void setUp() {
        fakerService = new FakerService()
        userDao = new UserDao()
    }

	def createUser(def birthDate="2008-02-18", def postDate=new DateTime(2008, 02, 18, 0,0,0,0),def reminderDate="2008-02-18T23:00:00.000Z") {
		def org = Org.findByName("9ci")
		def contactProps = [
				firstName: fakerService.firstName(),
				lastName: fakerService.lastName(),
				email: fakerService.email(),
				org: [id: org.id],
				type: ContactType.CUSTOMER
		]

		def userProps = [
				login: "test-login",
				password: "secretStuff",
				repassword: "secretStuff",
				inactive: false,
				activeDate: "2008-02-18T23:00:00.000Z",
				birthDate: birthDate,
				postDate: postDate,
				reminderDate: reminderDate,

				contact: contactProps
		]

		userDao.insert(userProps).entity
	}

    @Test
    void testReturnedDateFormats() {
		def user = createUser()
        assert user

        Calendar cal = Calendar.getInstance()
        cal.setTime(user.activeDate)
        TimeZone timezone= TimeZone.getTimeZone('UTC')
        cal.setTimeZone(timezone)

        assertEquals 2008, cal.get(Calendar.YEAR)
        assertEquals 1, cal.get(Calendar.MONTH)
        assertEquals 18, cal.get(Calendar.DAY_OF_MONTH)

		assertEquals "2008-02-18", user.birthDate.toString()
		assertEquals "2008-02-18T00:00:00.000${tzf.withZone(tz).print(0)}", user.postDate.toString()
    }


	@Test
	void testPostDateSpecifiedAsString() {
		def user = createUser(postDate: "2008-02-18T23:00:00.000Z")
		assert user

		assertEquals "2008-02-18T00:00:00.000${tzf.withZone(tz).print(0)}", user.postDate.toString()
	}

}