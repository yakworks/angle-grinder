package grinder

import grails.test.mixin.domain.DomainClassUnitTestMixin
import grails.test.*
import org.junit.*

@TestFor(OrgController)
@TestMixin(DomainClassUnitTestMixin)
@Mock([Org])
class OrgControllerTests {

    @Test
    void listAll() {
        // Given
        def firstOrg = new Org(id: 1, name: "GitHub", num: "111", city: "Seattle").save()
        def secondOrg = new Org(id: 2, name: "9ci", num: "222", city: "Chicago").save()
        def thirdOrg = new Org(id: 3, name: "Microsoft", num: "333").save()

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

}
