package agdemo

import agdemo.Contact
import agdemo.ContactType
import agdemo.Org
import grails.test.mixin.integration.Integration
import grails.transaction.Rollback
import org.junit.*
import spock.lang.Specification

@Integration
@Rollback
class ContactTests extends Specification {

  Map buildMap(Map extend){
    Contact.build(extend).properties
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

        when:
        def props = buildMap([
            org: org,
            type:      ContactType.CUSTOMER
        ] as Map)

        def contact = new Contact(props)
        assert contact.validate()
        contact.save(flush: true)

        then:
        contact.id
        props.firstName == contact.firstName
        props.lastName == contact.lastName
        props.email == contact.email
    }
}
