package agdemo

import grails.testing.gorm.DomainUnitTest
import spock.lang.Specification

class ContactTypeTest extends Specification implements DomainUnitTest<Org>{

    void testByName() {
      expect:
        ContactType.ADMIN == ContactType.byName("admin")
        ContactType.CUSTOMER == ContactType.byName("customer")
    }

}
