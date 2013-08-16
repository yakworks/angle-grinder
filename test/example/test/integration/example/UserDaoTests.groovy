package example

import grinder.Contact
import grinder.Org
import grinder.User
import grinder.UserDao

import org.junit.*
import com.coderberry.faker.*

class UserDaoTests extends GroovyTestCase {
    def FakerService fakerService
    def userDao

    @Before
    void setUp() {
        fakerService = new FakerService()
        userDao = new UserDao()
    }

    @Test
    void testInsert() {
        def org = Org.findByName("9ci")
        def contactProps = [
                firstName: fakerService.firstName(),
                lastName: fakerService.lastName(),
                email: fakerService.email(),
                org: [id: org.id]
        ]

        def userProps = [
                login: "test-login",
                password: "secretStuff",
                repassword: "secretStuff",
                inactive: false,

                contact: contactProps
        ]

        def user = userDao.insert(userProps).entity

        assert user
        assertEquals "test-login", user.login

        assert user.contact
        assertEquals contactProps.firstName, user.contact.firstName
        assertEquals contactProps.lastName, user.contact.lastName
        assertEquals contactProps.email, user.contact.email
    }

    @Test
    void testFindByLogin() {
        def user = User.findByLogin("admin")
        assert user

        def contact = user.contact
        assert contact

        def org = contact.org
        assert org
    }

    @Test
    void testUpdateUserContactOrg() {
        // Given
        def user = User.findByLogin("admin")
        def org = user.contact.org
        assertEquals "GitHub", org.name

        def otherOrg = Org.findByName("9ci")
        assert otherOrg

        def params = [
                id: user.id,
                login: "other-login",
                contact: [
                        org: [
                                id: otherOrg.id
                        ]
                ]
        ]

        // When
        userDao.update(params)
        user.refresh()

        // Then the contact should be changed
        assertEquals "other-login", user.login
        assertEquals otherOrg, user.contact.org
        assertEquals "9ci", user.contact.org.name
    }
}
