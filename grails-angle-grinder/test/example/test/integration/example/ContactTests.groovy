package example

import grinder.Contact
import grinder.ContactType
import grinder.Org

import org.junit.*
import com.coderberry.faker.*

class ContactTests extends GroovyTestCase {
    def FakerService fakerService

    @Before
    void setUp() {
        fakerService = new FakerService()
    }

    @Test
    void testCreateContactAlongWithOrg() {
        // Given
        def org = new Org(name: "Test Orgnization", num: "123-456")

        // When
        assert org.validate()
        org.save(flush: true)

        // Then
        assertEquals "Test Orgnization", org.name
        assertEquals "123-456", org.num

        // Given
        def props = [
            org: org,

            type:      ContactType.CUSTOMER,
            firstName: fakerService.firstName(),
            lastName:  fakerService.lastName(),
            email:     fakerService.email()
        ]

        // When
        def contact = new Contact(props)
        assert contact.validate()
        contact.save(flush: true)

        // Then
        assert contact.id
        assertEquals props.firstName, contact.firstName
        assertEquals props.lastName, contact.lastName
        assertEquals props.email, contact.email
    }
}
