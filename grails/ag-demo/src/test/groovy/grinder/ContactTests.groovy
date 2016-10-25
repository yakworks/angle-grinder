package agdemo

import grails.test.*
import org.junit.*

@TestFor(Contact)
class ContactTests {

    @Before
    void setUp() {
        mockForConstraintsTests(Contact)
    }

    @Test
    void testValidate() {
        def contact = new Contact()
        assert !contact.validate()

        assertEquals 4, contact.errors.allErrors.size()
        assertEquals "blank", contact.errors["name"]
        assertEquals "nullable", contact.errors["type"]
        assertEquals "nullable", contact.errors["org"]
        assertEquals "nullable", contact.errors["firstName"]
    }

}
