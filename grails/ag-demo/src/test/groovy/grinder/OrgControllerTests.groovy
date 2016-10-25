package agdemo

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
    void listAll() {
        // Given
        def firstOrg = new Org(id: 1, name: "GitHub", num: "111", city: "Seattle", orgShowCaseId: 1).save()
        def secondOrg = new Org(id: 2, name: "9ci", num: "222", city: "Chicago", orgShowCaseId: 1).save()
        def thirdOrg = new Org(id: 3, name: "Microsoft", num: "333", orgShowCaseId: 1).save()

        // When
        controller.listAll()

        // Then it renders valid json response
        assert response.text

        def json = response.json
        assertEquals 3, json.size()

        def first = json.get(0)
        assertEquals firstOrg.id, first.id
        assertEquals firstOrg.name, first.name
        assertEquals firstOrg.num, first.num

        def second = json.get(1)
        assertEquals secondOrg.id, second.id
        assertEquals secondOrg.name, second.name
        assertEquals secondOrg.num, second.num

        def third = json.get(2)
        assertEquals thirdOrg.id, third.id
        assertEquals thirdOrg.name, third.name
        assertEquals thirdOrg.num, third.num
    }

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
