package agdemo
import com.coderberry.faker.FakerService
import grails.converters.JSON
import agdemo.ContactType
import agdemo.Org
import agdemo.OrgShowCase
import agdemo.User
import agdemo.UserDao
import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.LocalDate
import org.joda.time.format.DateTimeFormat
import org.junit.Before
import org.junit.Test

class TimeZoneTests extends GroovyTestCase {
    def FakerService fakerService
    def orgShowCase
	def tzf = DateTimeFormat.forPattern("ZZ")
	def tz = DateTimeZone.getDefault()

    @Before
    void setUp() {
        fakerService = new FakerService()
        orgShowCase = new OrgShowCase()
    }

	def orgShowCase(def exampleLocalDate="2008-02-18", def exampleDateTime=new DateTime(2008, 02, 18, 0,0,0,0),def exampleDate="2008-02-18T23:00:00.000Z") {
		def props = [
				name: "test",
                exampleLocalDate: exampleLocalDate,
                exampleDateTime: exampleDateTime,
                exampleDate: exampleDate
		]

        orgShowCase.insert(props).entity
	}

    @Test
    void testReturnedDateFormats() {
		def org = orgShowCase()
        assert org

        Calendar cal = Calendar.getInstance()
        cal.setTime(org.exampleDate)


        assertEquals 2008, cal.get(Calendar.YEAR)
        assertEquals 1, cal.get(Calendar.MONTH)
        assertEquals 18, cal.get(Calendar.DAY_OF_MONTH)

		assertEquals "2008-02-18", org.exampleLocalDate.toString()
		//assertEquals "2008-02-18T00:00:00.000${tzf.withZone(tz).print(0)}", org.exampleDateTime.toString()
    }


	@Test
	void testPostDateSpecifiedAsString() {
		def org = orgShowCase(exampleDateTime: "2008-02-18T23:00:00.000Z")
		assert org

		//assertEquals "2008-02-18T00:00:00.000${tzf.withZone(tz).print(0)}", org.exampleDateTime.toString()
	}

}
