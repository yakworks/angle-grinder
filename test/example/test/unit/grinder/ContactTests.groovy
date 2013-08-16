package grinder

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

        assertEquals 3, contact.errors.allErrors.size()
        assertEquals "blank", contact.errors["name"]
        assertEquals "nullable", contact.errors["firstName"]
        assertEquals "nullable", contact.errors["org"]
    }

}
