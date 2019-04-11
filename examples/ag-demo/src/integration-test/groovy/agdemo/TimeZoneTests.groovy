package agdemo

import grails.converters.JSON
import agdemo.ContactType
import agdemo.Org
import agdemo.OrgShowCase
import agdemo.User
import agdemo.UserDao
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.LocalDate
import org.joda.time.format.DateTimeFormat
import spock.lang.Specification

@Integration
@Rollback
class TimeZoneTests extends Specification {
    def orgShowCaseDao
	def tzf = DateTimeFormat.forPattern("ZZ")
	def tz = DateTimeZone.getDefault()

	def orgShowCase(def exampleLocalDate="2008-02-18", def exampleDateTime=new DateTime(2008, 02, 18, 0,0,0,0),def exampleDate="2008-02-18T23:00:00.000Z") {
		def props = [
				name: "test",
                exampleLocalDate: exampleLocalDate,
                exampleDateTime: exampleDateTime,
                exampleDate: exampleDate
		]

        orgShowCaseDao.insert(props).entity
	}

    void testReturnedDateFormats() {
      when:
		def org = orgShowCase()
        assert org

        Calendar cal = Calendar.getInstance()
        cal.setTime(org.exampleDate)

      then:
        2008 == cal.get(Calendar.YEAR)
        1 == cal.get(Calendar.MONTH)
        18 == cal.get(Calendar.DAY_OF_MONTH)

		    "2008-02-18" == org.exampleLocalDate.format("yyyy-MM-dd")
    }

  void testPostDateSpecifiedAsString() {
    when:
		  def org = orgShowCase(exampleDateTime: "2008-02-18T23:00:00.000Z")
		then:
      org
	}

}
