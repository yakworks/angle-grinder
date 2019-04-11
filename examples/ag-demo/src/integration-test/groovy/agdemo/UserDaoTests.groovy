package agdemo
import grails.converters.JSON
import agdemo.ContactType
import agdemo.Org
import agdemo.User
import agdemo.UserDao
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import spock.lang.Specification

@Integration
@Rollback
class UserDaoTests extends Specification {
    def userDao

    void setup() {
        userDao = new UserDao()
    }

    void testInsert() {
        def org = Org.findByName("9ci")
        def contactProps = [
                firstName: "Peter",
                lastName: "Parker",
                email: "spiderman@avengers.com",
                org: [id: org.id],
                type: ContactType.CUSTOMER
        ]

        def userProps = [
                login: "test-login",
                password: "secretStuff",
                repassword: "secretStuff",
                inactive: false,
                activeDate: "2008-02-18T23:00:00.000Z",
				birthDate: "2008-02-18",
				postDate: "2008-02-18T23:00:00.000+0100",
				reminderDate: "2008-02-18T23:00:00.000Z",

                contact: contactProps
        ]

        def user = userDao.insert(userProps).entity

        assert user
        assertEquals "test-login", user.login

        Calendar cal = Calendar.getInstance()
        cal.setTime(user.activeDate)
        TimeZone timezone= TimeZone.getTimeZone('UTC')

        assertEquals 2008, cal.get(Calendar.YEAR)
        assertEquals 1, cal.get(Calendar.MONTH)
        assertEquals 18, cal.get(Calendar.DAY_OF_MONTH)

        assert user.contact
        assertEquals contactProps.firstName, user.contact.firstName
        assertEquals contactProps.lastName, user.contact.lastName
        assertEquals contactProps.email, user.contact.email
    }

    void testFindByLogin() {
        def user = User.findByLogin("admin")
        assert user

        def contact = user.contact
        assert contact

        def org = contact.org
        assert org
    }

    void testUpdateUserContactOrg() {
        // Given
        def user = User.findByLogin("admin")
        def org = user.contact.org
        assertEquals "9ci", org.name

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
