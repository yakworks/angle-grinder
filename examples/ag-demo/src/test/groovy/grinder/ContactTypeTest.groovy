package agdemo

import spock.lang.Specification
import org.junit.*

class ContactTypeTest extends Specification{

    void testByName() {
      expect:
        ContactType.ADMIN == ContactType.byName("admin")
        ContactType.CUSTOMER == ContactType.byName("customer")
    }

}
