package agdemo

import agdemo.Contact
import agdemo.ContactType
import agdemo.Org
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.junit.*
import com.coderberry.faker.*
import spock.lang.Specification

@Integration
@Rollback
class ContactTests extends Specification {
    def FakerService fakerService


    void setup() {
        fakerService = new FakerService()
    }


    void testCreateContactAlongWithOrg() {
        setup:
        def org = new Org(name: "Test Orgnization", num: "123-456", orgShowCaseId: 1)

        when:
        assert org.validate()
        org.save(flush: true)

        then:
        "Test Orgnization" == org.name
        "123-456" == org.num

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
