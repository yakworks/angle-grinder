package agdemo

import grails.test.*
import org.joda.time.DateTime
import org.joda.time.LocalDate
import org.junit.*

@TestFor(User)
class UserTests {

    @Before
    void setUp() {
        def existingUser = new User(login: "test")
        mockForConstraintsTests(User, [existingUser])
    }

    @Test
    void testValidate() {
        def invalidUser = new User()
        assert !invalidUser.validate()

        assertEquals 4, invalidUser.errors.allErrors.size()
        assertEquals "nullable", invalidUser.errors["login"]
        assertEquals "nullable", invalidUser.errors["passwd"]
        assertEquals "nullable", invalidUser.errors["contact"]
        assertEquals "nullable", invalidUser.errors["activeDate"]

        def contact = new Contact()
        def validUser = new User(login: "login", contact: contact)
        validUser.passwd = "password"
        validUser.activeDate = new Date()

        assert validUser.validate()
    }

    @Test
    void testLoginUniquenessValidation() {
        def user = new User(login: "test")

        assert !user.validate()
        assertEquals "unique", user.errors["login"]
    }
}
