package agdemo

import grails.test.mixin.Mock
import grails.test.mixin.TestFor
import grails.test.mixin.TestMixin
import grails.test.mixin.domain.DomainClassUnitTestMixin
import spock.lang.Specification

@TestFor(OrgController)
@TestMixin(DomainClassUnitTestMixin)
@Mock([Org, User, Contact])
class OrgControllerTests extends Specification{

    void testListAll() {
        given:
        def firstOrg = new Org(id: 1, name: "GitHub", num: "111", city: "Seattle", orgShowCaseId: 1).save()
        def secondOrg = new Org(id: 2, name: "9ci", num: "222", city: "Chicago", orgShowCaseId: 1).save()
        def thirdOrg = new Org(id: 3, name: "Microsoft", num: "333", orgShowCaseId: 1).save()

        when:
        controller.listAll()
        def json = response.json
        def first = json.get(0)
        def second = json.get(1)
        def third = json.get(2)

        // Then it renders valid json response
        then:
        response.text
         3 == json.size()
         firstOrg.id == first.id
         firstOrg.name == first.name
         firstOrg.num == first.num
         secondOrg.id == second.id
         secondOrg.name == second.name
         secondOrg.num == second.num
         thirdOrg.id == third.id
         thirdOrg.name == third.name
         thirdOrg.num == third.num
    }

    void testListUsers() {
        given:
        Org firstOrg = new Org(id: 1, name: "GitHub", num: "111", city: "Seattle", orgShowCaseId: 1).save()
        Org secondOrg =  new Org(id: 2, name: "GitHub2", num: "1121", city: "Chicago", orgShowCaseId: 2).save()

        Contact firstContact = new Contact(type: ContactType.CUSTOMER, name: "First", firstName: "Luke", org: firstOrg).save()
        User firstUser = new User(login: "first",  contact: firstContact).save()

        controller.params.page = 1
        controller.params.max = 20
        controller.params.id = firstOrg.id

        when:
        controller.listUsers()
        def json = response.json

        then:
        response.text
        1 == json.page
    }

}
