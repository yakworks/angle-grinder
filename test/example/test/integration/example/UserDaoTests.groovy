package example

import grinder.Contact
import grinder.Org
import grinder.User
import grinder.UserDao

import org.junit.*
import com.coderberry.faker.*

class UserDaoTests extends GroovyTestCase {
    def FakerService fakerService

    @Before
    void setUp() {
        fakerService = new FakerService()
    }

    @Test
    void testCreateUserAlongWithContact() {
        def userDao = new UserDao()
        def org = Org.findByName("9ci")

        def contactProps = [
                firstName: fakerService.firstName(),
                lastName: fakerService.lastName(),
                email: fakerService.email(),
                org: [id: org.id]
        ]

        def props = [
                login: "test-login",
                password: "secretStuff",
                repassword: "secretStuff",
                inactive: false,

                contact: contactProps
        ]

        def user = userDao.insert(props).entity

        assert user
        assertEquals "test-login", user.login

        assert user.contact
        assertEquals contactProps.firstName, user.contact.firstName
        assertEquals contactProps.lastName, user.contact.lastName
        assertEquals contactProps.email, user.contact.email
    }
}
