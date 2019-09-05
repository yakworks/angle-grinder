package agdemo

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat
import spock.lang.Specification

@Integration
@Rollback
class TimeZoneTests extends Specification {
    OrgShowCaseRepo orgShowCaseRepo
	def tzf = DateTimeFormat.forPattern("ZZ")
	def tz = DateTimeZone.getDefault()

	def orgShowCase(def exampleLocalDate="2008-02-18", def exampleDateTime=new DateTime(2008, 02, 18, 0,0,0,0),def exampleDate="2008-02-18T23:00:00.000Z") {
		def props = [
				name: "test",
                exampleLocalDate: exampleLocalDate,
                exampleDateTime: exampleDateTime,
                exampleDate: exampleDate
		]

        orgShowCaseRepo.create(props)
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
