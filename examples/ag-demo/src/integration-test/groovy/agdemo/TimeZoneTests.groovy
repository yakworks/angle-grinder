package agdemo

import org.joda.time.DateTime
import org.joda.time.DateTimeZone
import org.joda.time.format.DateTimeFormat

import gorm.tools.beans.DateUtil
import gorm.tools.beans.IsoDateUtil
import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import spock.lang.Ignore
import spock.lang.Specification

@Integration
@Rollback
class TimeZoneTests extends Specification {
    OrgShowCaseRepo orgShowCaseRepo
    def tzf = DateTimeFormat.forPattern("ZZ")
    def tz = DateTimeZone.getDefault()

    def orgShowCase(Map params=[:]) {
      Map defaults = [
        name: "test",
       exampleLocalDate:IsoDateUtil.parseLocalDate("2008-02-18"),
       exampleDateTime:IsoDateUtil.parseLocalDateTime("2008-02-18T00:00:00.000"),
       exampleDate:"2008-02-18T23:00:00.000Z"
      ]
        def props = defaults << params

        orgShowCaseRepo.create(props)
    }

    void testReturnedDateFormats() {
      when:
        OrgShowCase org = orgShowCase()
        assert org

        Calendar cal = Calendar.getInstance()
        cal.setTime(org.exampleDate)

      then:
        2008 == cal.get(Calendar.YEAR)
        1 == cal.get(Calendar.MONTH)
        19 == cal.get(Calendar.DAY_OF_MONTH)

        "2008-02-18" == org.exampleLocalDate.toString()
    }

  void testPostDateSpecifiedAsString() {
    when:
          def org = orgShowCase([exampleDateTime: IsoDateUtil.parseLocalDateTime("2008-02-18T23:00:00.000Z")])
        then:
      org
    }

}
