package agdemo

import grails.test.*
import org.junit.*

class ContactTypeTest {

    @Test
    void testByName() {
        assertEquals ContactType.ADMIN, ContactType.byName("admin")
        assertEquals ContactType.CUSTOMER, ContactType.byName("customer")
    }

}
