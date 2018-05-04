package agdemo

import agdemo.OrgDao
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class OrgDaoTests extends Specification {

  OrgDao orgDao

  Map buildMap(Map extend) {
    agdemo.Org.build(extend).properties
  }

  void testInsert() {
    setup:
    when:
    def json = [
      class        : Org.class.getName(),
      name         : "Peter",
      num          : "11-22-33-44",
      phone        : "11-223-5555-6666",
      state        : "NY",
      city         : "New York",
      zip          : "123445",
      street       : "Baker st",
      timeZone     : "UTC-6",
      orgShowCaseId: 1,
      addressDate  : "2008-02-18T23:00:00.000Z"
    ]
    def org = orgDao.insert(json).entity
    org.refresh()

    assert org
    assert org.addressDate

    Calendar cal = Calendar.getInstance()
    cal.setTime(org.addressDate)
    cal.setTimeZone(TimeZone.getTimeZone('UTC'))
    then:
    2008 == cal.get(Calendar.YEAR)
    1 == cal.get(Calendar.MONTH)
    18 == cal.get(Calendar.DAY_OF_MONTH)
  }

  void testUpdate() {
    when:
    def json1 = [
      class        : Org.class.getName(),
      name         : "Peter",
      num          : "11-22-33-44",
      phone        : "11-223-5555-6666",
      state        : "NY",
      city         : "New York",
      zip          : "123445",
      street       : "Baker st",
      timeZone     : "UTC-6",
      orgShowCaseId: 1
    ]
    def org1 = orgDao.insert(json1).entity

    def json = [
      id           : org1.id,
      class        : Org.class.getName(),
      name         : "Peter222",
      num          : "221-22-33-44",
      phone        : "11-223-5555-6666",
      state        : "NY",
      city         : "New York",
      zip          : "123445",
      street       : "Baker st",
      timeZone     : "UTC-6",
      orgShowCaseId: 1,
      addressDate  : "2015-02-07"
    ]
    def org = orgDao.update(json).entity


    assert org
    assert org.addressDate

    Calendar cal = Calendar.getInstance()
    cal.setTime(org.addressDate)
    cal.setTimeZone(TimeZone.getTimeZone('UTC'))
    then:
    2015 == cal.get(Calendar.YEAR)
    1 == cal.get(Calendar.MONTH)
    6 == cal.get(Calendar.DAY_OF_MONTH)
  }
}
