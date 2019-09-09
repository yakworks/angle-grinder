package agdemo

import grails.gorm.transactions.Rollback
import grails.testing.mixin.integration.Integration
import spock.lang.Specification

@Integration
@Rollback
class ContactSpec extends Specification {

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
