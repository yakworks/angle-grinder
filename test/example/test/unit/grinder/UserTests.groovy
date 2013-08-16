package grinder

import grails.test.*
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

        assertEquals 3, invalidUser.errors.allErrors.size()
        assertEquals "nullable", invalidUser.errors["login"]
        assertEquals "nullable", invalidUser.errors["passwd"]
        assertEquals "nullable", invalidUser.errors["contact"]

        def contact = new Contact()
        def validUser = new User(login: "login", contact: contact)
        validUser.passwd = "password"
        assert validUser.validate()
    }

    @Test
    void testLoginUniquenessValidation() {
        def user = new User(login: "test")

        assert !user.validate()
        assertEquals "unique", user.errors["login"]
    }
}
