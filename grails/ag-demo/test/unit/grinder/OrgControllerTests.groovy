package grinder

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import grails.test.mixin.TestMixin
import grails.test.mixin.domain.DomainClassUnitTestMixin
import org.junit.Ignore
import org.junit.Test

@TestFor(OrgController)
@TestMixin(DomainClassUnitTestMixin)
@Mock([Org, User, Contact])
class OrgControllerTests {

    @Test
    @Ignore
    void listUsers() {
        // Given
        def firstOrg = new Org(name: "first firstOrg", num: "111").save()
        def secondOrg = new Org(name: "second firstOrg", num: "222").save()

        def firstContact = new Contact(type: ContactType.CUSTOMER, name: "First", firstName: "Luke", org: firstOrg).save()
        def firstUser = new User(login: "first",  contact: firstContact).save()

        controller.params.page = 1
        controller.params.max = 20
        controller.params.id = firstOrg.id

        // When
        controller.listUsers()

        // Then it renders valid json response
        assert response.text

        def json = response.json
        assertEquals 1, json.page
    }

}
